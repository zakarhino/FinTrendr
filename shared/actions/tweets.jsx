import axios from 'axios';

export const FETCH_TWEETS = 'FETCH_TWEETS';

export function getTweets(keyword) {
  // let request = axios.get(`http://rss2json.com/api.json?rss_url=https%3A%2F%2Fnews.google.com%2Fnews%3Fq%3D${keyword}%26output%3Drss`);
  // console.log("tweets", request);
  // let request = axios.get(`https://api.twitter.com/1.1/trends/place.json?id=1`);
  // console.log(request);
  
  let request = { data: { items : [
      {
        guid: 0,
        name: "thing one",
        tweet_volume: "someone",
        url: "http://www.google.com"
      },
      {
        guid: 1,
        name: "thing two",
        tweet_volume: "someone else",
        url: "http://www.google.com"
      },
      {
        guid: 2,
        name: "thing three",
        tweet_volume: "no one",
        url: "http://www.google.com"
      }
    ]
  }};

  return {
    type: FETCH_TWEETS,
    payload: request
  };
};

/*
[
  {
    "as_of": "2012-08-24T23:25:43Z",
    "created_at": "2012-08-24T23:24:14Z",
    "locations": [
      {
        "name": "Worldwide",
        "woeid": 1
      }
    ],
    "trends": [
      {
        "tweet_volume": 3200,
        "events": null,
        "name": "#GanaPuntosSi",
        "promoted_content": null,
        "query": "%23GanaPuntosSi",
        "url": "http://twitter.com/search/?q=%23GanaPuntosSi"
      }
 */