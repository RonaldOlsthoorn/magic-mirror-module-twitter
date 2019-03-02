import Twitter from 'twitter';
import React, { Component } from 'react';
import config from './config.json';


export default class TwitterFetcher extends Component {

  constructor(props) {
    super(props);
    this.tag = config.config.tag;
    this.interval = config.config.interval;
    this.consumer_key = config.config.consumer_key;
    this.consumer_secret = config.config.consumer_secret;
    this.bearer_token = config.config.bearer_token;
  }

  componentDidMount() {
    this.updateFeed()

    this.intervalID = setInterval(
      () => this.tick(),
      this.interval
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.updateFeed()
  }

  updateFeed(){

    console.log(this.client)

    var client = new Twitter({
      consumer_key: this.consumer_key,
      consumer_secret: this.consumer_secret,
      bearer_token: this.bearer_token
    });

    client.get('search/tweets', {q: this.tag}, function(error, tweets, response) {
      if(error) throw error;
      console.log(tweets);  // The favorites.
      this.setState({feed: tweets})
      console.log(response);  // Raw response object.
   });

    return
  }

  render() {

    const css = `
      .my-element {
        height:100%;
        display:flex;
        flex-direction:column;
        justify-content:center;
      }

      .my-h1 {
        text-align: center;
      }
    `

    return (
      <div className="my-element">
        <style>{css}</style>
        <h1 className="my-h1"></h1>
      </div>
    );
  }
}
