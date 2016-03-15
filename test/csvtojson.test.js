
var should = require('should');
var csv = require('../utility/csvtojson.js');
var fs = require('fs');

describe('csv to json test', function() {
  it('csv instance', function(done) {
    should.exist(csv);
    done();
  })

  it('csv function', function(done) {
    csv.loadCSV.should.be.a.Function();
    csv.csvtojson.should.be.a.Function();
    done();
  })

  it('test load csv function',function(){
    // fs.readFile('./resource/test.csv',function(data,error){
    //   if(error){
    //
    //   }
    //   csv.loadCSV
    // })
  });

  it('test file not found',function(done){
    csv.loadCSV('./test.cvs').catch(function(error){
      console.log(error);
      done();
    })

  })
})
