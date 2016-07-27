var request = require('supertest');

var app = null;

const baseUrl = '/api/';
const personMongoUrl = 'PersonMongos/';
const personUrl = 'People/';
const brokenId = '578864759562170021143369';

const lBreak = '-----------------------------------------------------';

before(function(done) {
  this.timeout(20000);
  app = require('../server/server');
  app.once('booted', function() {
    done();
  });
});

beforeEach(function(done) {
  console.log(lBreak);
  done();
});


describe('MongoDB Model ID Bug', function() {
  // This should successfully retrieve the model, but fails due to the scientific notaion bug.
  it('Should fail to get the Person (REST findByID)', function(done) {
    const url = baseUrl + personMongoUrl + brokenId;
    console.log('Testing GET:' + url)

    request(app)
      .get(url)
      .expect(200, function(err, res) {
        console.log(res.body.error.message);
        done(err);
      });
  });

  // This should successfully retrieve the model and does (phew!)
  it('Should get the Person (REST findAll)', function(done) {
    const url = baseUrl + personMongoUrl;
    console.log('Testing GET:' + url)

    var whereFilter = {
      id: brokenId
    };

    request(app)
      .get(url)
      .send({ 'filter': { 'where': { 'id': brokenId } } })
      .expect(200, function(err, res) {
        console.log(res.body);
        done(err);
      });
  });

  // This should successfully retrieve the model and does (phew!)
  it('Should get the Person (findById)', function(done) {
    console.log('Testing findById: ' + brokenId);

    app.models.PersonMongo.findById(brokenId, function(err, person) {
      console.log('findById result: ' + JSON.stringify(person));
      done();
    });
  });
});

describe('Memory Model ID Bug', function() {
  // This is some weird behaviour i came accross. Im not sure if it's specific to the Memory Connector. But worth noting either way.
  it('Should get the Person with scientific notation (bug)', function(done) {
    const url = baseUrl + personUrl + brokenId;
    console.log('Testing GET:' + url)

    request(app)
      .get(url)
      .expect(200, function(err, res) {
        console.log(res.body);
        done(err);
      });
  });

  it('Should get the Person (findById)', function(done) {
    console.log('Testing findById: ' + brokenId);

    app.models.Person.findById(brokenId, function(err, person) {
      console.log('findByID Result: ' + person.id);
      done();
    });
  });
});