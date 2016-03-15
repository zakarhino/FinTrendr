/**
   Copyright 2014 AlchemyAPI

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/


// var express = require('express');
// var consolidate = require('consolidate');

// var app = express();
// var server = require('http').createServer(app);
var request = require('request');

//Create the AlchemyAPI object
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

// all environments
// app.engine('dust', consolidate.dust);
// app.set('views', __dirname + '/views');
// app.set('view engine', 'dust');
// app.set('port', process.env.PORT || 3000);
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());

// development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }

// app.get('/', example);



// var port = process.env.PORT || 3000;
// server.listen(port, function() {
//   console.log('Express server listening on port ' + port);
//   console.log('To view the example, point your favorite browser to: localhost:3000');
// });



// var demo_text = 'Tim Cook Apple';
// var demo_url = 'http://ir.inovio.com/news/news-releases/news-releases-details/2016/Inovio-Pharmaceuticals-DNA-Vaccine-for-Zika-Virus-Induces-Robust-Immune-Responses-in-Preclinical-Study/default.aspx';
// var demo_html = '<html><head><title>Node.js Demo | AlchemyAPI</title></head><body><h1>Did you know that AlchemyAPI works on HTML?</h1><p>Well, you do now.</p></body></html>';


// function example(req, res) {
//   var output = {};

//   //Start the analysis chain
//   keywords(req, res, output);
// }


// function entities(req, res, output) {
//  alchemyapi.entities('text', demo_text,{ 'sentiment':1 }, function(response) {
//    output['entities'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['entities'] };
//    keywords(req, res, output);
//  });
// }


// function keywords(req, res, output) {
//  alchemyapi.keywords('text', demo_text, { 'sentiment':1 }, function(response) {
//    output['keywords'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['keywords'] };
//    concepts(req, res, output);
//  });
// }

// function keywords(req, res, output) {
//  alchemyapi.keywords('text', demo_text, { 'sentiment':1 }, function(response) {
//    output['keywords'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['keywords'] };
//    concepts(req, res, output);
//  });
// }
var count = 0;
module.exports = function keywords(keyword, item, cb) {
  var keywordList = [];
  var parsedString;
  var keyword1 = keyword;
  var keyword2 = item;
  count = count + 1;
  console.log(count);
  setTimeout(function() {
    request.get('http://rss2json.com/api.json?rss_url=https%3A%2F%2Fnews.google.com%2Fnews%3Fq%3D' + keyword1 + '%20' + keyword2 + '%26output%3Drss', function(err, response, body) {
      if(err) {
        cb(err);
      }
      var parsed = JSON.parse(body);
      console.log(body);
      if(parsed.status === 'error') {
        cb('rate limited')
        return;
      }
      var mapped = parsed.items.map(function(obj) {
        return obj.link.substr(obj.link.indexOf('url=') + 4);
      })

      mapped.forEach(function(url) {
        var promise = new Promise(function(resolve, reject) {

          alchemyapi.keywords('url', url, { 'sentiment': 0 }, function(response, err, err2) {
            console.log(response, "error is: ", err, err2);

            var tempData = response;
            if (tempData.status === 'ERROR') {
              resolve(0);
            }
            if (tempData.keywords) {
              var tempKeywordList = []
                // console.log('tempData for :', i, " is ", tempData.keywords);
              var tempData2 = tempData.keywords;
              tempData2.forEach(function(obj) {
                if (obj.text) {
                  tempKeywordList.push(obj.text);
                }
              });
              var tempKeywordList2 = tempKeywordList.toString().toLowerCase();
              console.log(tempKeywordList2.includes(keyword1));
              console.log(tempKeywordList2.includes(keyword2));
              if (tempKeywordList2.includes(keyword1)) {
                if (tempKeywordList2.includes(keyword2)) {
                  console.log("this is the keyword list ", tempKeywordList2);
                  resolve(1);
                } else {
                  resolve(0);
                }
              } else {
                resolve(0);
              }
              // output['keywords'] = { url: mapped[i], response: JSON.stringify(response, null, 4), results: response['keywords'] };

            }
          });

        });
        keywordList.push(promise);
      });


      Promise.all(keywordList).then(function(results) {
        console.log('keyword list is: ', keywordList);
        var reduced = ((results.reduce(function(a, b) {
          return a + b;
        }, 0)) / results.length);
        console.log('were done', results);

        cb(reduced);
      });

      // alchemyapi.keywords('url', parsedString, { 'sentiment': 1 }, function(response) {
      //   var tempData = response;
      //   console.log(tempData);
      //   var tempData2 = tempData.keywords;
      //   tempDataText = tempData2.map(function(obj) {
      //     return obj.text;
      //   })
      //   console.log(tempDataText);
      //   output['keywords'] = { url: parsedString, response: JSON.stringify(response, null, 4), results: response['keywords'] };
      //   // concepts(req, res, output);

    });
  }, 5000);

}

// function concepts(req, res, output) {
//  alchemyapi.concepts('text', demo_text, { 'showSourceText':1 }, function(response) {
//    output['concepts'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['concepts'] };
//    sentiment(req, res, output);
//  });
// }


// function sentiment(req, res, output) {
//  alchemyapi.sentiment('html', demo_html, {}, function(response) {
//    output['sentiment'] = { html:demo_html, response:JSON.stringify(response,null,4), results:response['docSentiment'] };
//    text(req, res, output);
//  });
// }


// function text(req, res, output) {
//  alchemyapi.text('url', demo_url, {}, function(response) {
//    output['text'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
//    author(req, res, output);
//  });
// }


// function author(req, res, output) {
//  alchemyapi.author('url', demo_url, {}, function(response) {
//    output['author'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
//    language(req, res, output);
//  });
// }


// function language(req, res, output) {
//  alchemyapi.language('text', demo_text, {}, function(response) {
//    output['language'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response };
//    title(req, res, output);
//  });
// }


// function title(req, res, output) {
//  alchemyapi.title('url', demo_url, {}, function(response) {
//    output['title'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
//    relations(req, res, output);
//  });
// }


// function relations(req, res, output) {
//  alchemyapi.relations('text', demo_text, {}, function(response) {
//    output['relations'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['relations'] };
//    category(req, res, output);
//  });
// }


// function category(req, res, output) {
//  alchemyapi.category('text', demo_text, {}, function(response) {
//    output['category'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response };
//    feeds(req, res, output);
//  });
// }


// function feeds(req, res, output) {
//  alchemyapi.feeds('url', demo_url, {}, function(response) {
//    output['feeds'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response['feeds'] };
//    microformats(req, res, output);
//  });
// }


// function microformats(req, res, output) {
//  alchemyapi.microformats('url', demo_url, {}, function(response) {
//    output['microformats'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response['microformats'] };
//    taxonomy(req, res, output);
//  });
// }


// function taxonomy(req, res, output) {
//  alchemyapi.taxonomy('url', demo_url, {}, function(response) {
//    output['taxonomy'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
//    combined(req, res, output);
//  });
// }

// function combined(req, res, output) {
//  alchemyapi.combined('url', demo_url, {}, function(response) {
//    output['combined'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
//    image(req, res, output);
//  });
// }

// function image(req, res, output) {
//  alchemyapi.image('url', demo_url, {}, function(response) {
//    output['image'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
//    image_keywords(req, res, output);
//  });
// }

// function image_keywords(req, res, output) {
//  alchemyapi.image_keywords('url', demo_url, {}, function(response) {
//    output['image_keywords'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
//    res.render('example',output);
//  });
// }
