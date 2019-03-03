import React, { Component } from 'react';
import config from './config.json';


export default class TwitterFetcher extends Component {

  constructor(props) {
    super(props);
    this.interval = config.config.interval;
    this.url = config.config.url;
        this.state = {
        tweets: []
    };
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
    fetch(this.url)
      .then(res =>{
        res.json().then(
          result =>{
            this.setState({
              tweets: result.tweets
            });
          }
        );
      }
    );

      console.log(this.state)
  }

  render() {

  const css = `
      .twitter-block {
        width:30%;
      }
      .twitter-list{
        list-style-type:none;
      }
      .twitter-item{
        margin:0 0 1em 0;
      }
    `

  const list = (
    <ul className="twitter-list">
      {this.state.tweets.map((tweet) =>
        <li className={["small", "twitter-item"].join(" ")} key={tweet.id}>
          {tweet.text}
        </li>
      )}
    </ul>
  );

    return (
      <div className="twitter-block">
      <style>{css}</style>
      <p># twitter </p>
        {list}
      </div>
    );
  }
}
