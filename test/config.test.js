
var should = require('should');
var config = require('../utility/common').config();

describe('Configuration Test', function(){

  it('Config instance', function () {
     should.exist(config);
  })

  it('DB Configuration',function(){
    should.exist(config.neo4j.server);
    should.exist(config.neo4j.user);
    should.exist(config.neo4j.password);
  })
})
