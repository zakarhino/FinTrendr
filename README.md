# FinTrendr
[![Build Status](https://travis-ci.org/xlnc-app/FinTrendr.svg)](https://travis-ci.org/xlnc-app/FinTrendr)

Trendr is a responsive web application built by a team of five full stack software engineers. Leveraging a suite of apis to deliver information on current hidden market trends and associations to help direct your finiancial moves at home, the office or even on the go.

Visit the site now : [www.trendr.xyz](http://www.trendr.xyz)

# [Watch the video](http://www.ourvideo.com)


# installation
### To get started

##### Set up database

```
 npm setup.js
```

##### Start server

```
 npm install
 npm start
```

# APIs
- [ Google Trends ](https://www.google.com/trends/)
- [ Google News ](https://www.news.google.com)
- [ Alchemy ](http://www.alchemyapi.com)

# Choice of Technologies
- React
- Redux
- Express
- Node.js
- [Cheerio](https://github.com/cheeriojs/cheerio) Web Scraping
- [Natural](https://github.com/NaturalNode/natural) Natural Language Processing
- [Fuzzy](https://github.com/bripkens/fuzzy.js) Approximate string matching
- [React-D3](https://github.com/esbullington/react-d3) Charts
- Neo4j
- Seraph
- Bable
- Webpack
- Mocha
- Should.Js
- Supertest
- Gulp
- Travis ci

# File Structure
Files are separated into three main sections.

Public : holds static file assets 

Server : continas the server, middleware, express routing, sockets, nodemailer and helper functions.

Shared : React and Redux

Test : contains all Mocha / Should.Js / Enzyme tests.

Utility : stuff

Config : things

```
Trendr
  |-config
  |-public
  |---styles
  |---libs
  |-server
  |---db
  |-shared
  |---actions
  |---components
  |---reducers
  |-test
  |-utility
  
```

# Architecture

# Database Design
# Features
- Search kewords to find corelations

# Future Features
- Save and share searches

# Tests
Testing done in Mocha.js/Should.js.  Coverage [ XX% ]

Testing includes both backend and front end coverage
```
  npm test
```

# Style Guide
[Style Guide](STYLE_GUIDE.md)

# Contributing
[Contributing Guide](CONTRIBUTING.md)

# Linting
Install eslint globaly and run

```
  npm install -g eslint
```

# License
  Trendr is a project made with help and cooperation from [MakerSquare](http://www.makersquare.com/)
  The project is open source but full credit must be given by any and all projects forked from this repo

# Team

- Zak Golding [<img src="http://cdn.flaticon.com/png/256/25231.png" width=20>](https://github.com/zakarhino) [<img src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519948-008_Mail-128.png" width=20>](mailto:zak@0x7cf.com?Subject=Trendr)
- Jason Cheung [<img src="http://cdn.flaticon.com/png/256/25231.png" width=20>](https://github.com/JCheungX) [<img src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519948-008_Mail-128.png" width=20>](mailto:jasoncheungcf@gmail.com?Subject=Trendr)
- Eric Mustin [<img src="http://cdn.flaticon.com/png/256/25231.png" width=20>](https://github.com/ericmustin) [<img src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519948-008_Mail-128.png" width=20>](mailto:mustin.eric@gmail.com?Subject=Trendr)
- Arlen Neylon [<img src="http://cdn.flaticon.com/png/256/25231.png" width=20>](https://github.com/aneylon) [<img src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519948-008_Mail-128.png" width=20>](mailto:arlen.m.neylon@gmail.com?Subject=Trendr)