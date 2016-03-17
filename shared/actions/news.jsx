import axios from 'axios';
import parser from 'xml2js';

export const FETCH_NEWS = "FETCH_NEWS";

export function getNews(keyword) {
  console.log("Get news was called");
  const url = '/api/getNews';
  const request = axios.get(`${url}/${keyword.Keyword}`);

  return {
    type: FETCH_NEWS,
    payload: request
  };
};

// let fetchNews = keyword => {
//   console.log("fetch news was called");
//   let url = 'https://news.google.com/news/section';
//   // let url2 = 'https://api.github.com/users/benjamingeorge';
//   return new Promise((resolve, reject) => {
//     axios.defaults.headers['Access-Control-Allow-Origin'] = "*";
//     axios.get(url, {
//       params: {
//         q: keyword,
//         output: 'rss'
//       },
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         "Cookie": "NID=77=apd_LY-1jDlEzVeflZvtLpvTDEEYRWxP3iOyLUFcae0mwDD4Ju7VtT2-9GhuicCg850J8mGp5haOQMpk9J7ISlQQyJR_hAsfuPdRjh_OSCY1AuTn4QTSS-d_ibjYKxzm"
//       }
//     })
//     .then((res) => {
//       console.log("Res:", res.data);
//       let parsed = parser.parseString(res.data);
//       console.log("Parsed XML:", parsed);
//       resolve(parsed);
//     })
//     .catch((res) => {
//       console.log("Fuck you:", res.data);
//     });
//   });
// };
