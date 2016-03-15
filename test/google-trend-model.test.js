var should = require('should');
var config = require('../utility/common')
  .config();
var googleTrend = require('../server/model/google-trend-model');
var tempData = require('./testresponse.js');
describe('Google Trend Model', function() {

  it('Shoudl contain google trend instnace', function() {
    should.exist(googleTrend);
  })

  it('Should contain google trend method', function() {
    googleTrend.query.should.be.a.Function();
    googleTrend.convertGtrends.should.be.a.Function();
  });
});

describe('convertGtrends', function() {
  var tempGoogleResponse = eval(tempData.tempString.slice(61));
  it('should return an array', function() {
    var x = googleTrend.convertGtrends(tempGoogleResponse);
    x.should.be.an.instanceOf(Array);
  });
});
