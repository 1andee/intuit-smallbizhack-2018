let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
const expect = require('chai').expect;
let should = chai.should();

const knexConfig  = require('../knexfile');
const knex = require('knex')(knexConfig['test']);

chai.use(chaiHttp);

describe('API Routes', () => {

  beforeEach(() => knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run())
  );

  afterEach(() => knex.migrate.rollback());

  describe('GET /api/customer/all', () => {
    it('it should fetch all customers properties', (done) => {
      chai.request(server)
          .get('/api/customer/all')
          .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.customers.should.be.a('array');
                res.body.customers[0].should.have.property('name');
                res.body.customers[0].should.have.property('address1');
                res.body.customers[0].should.have.property('address2');
                res.body.customers[0].should.have.property('city');
                res.body.customers[0].should.have.property('province');
                res.body.customers[0].should.have.property('zip');
                res.body.customers[0].should.have.property('country');
                res.body.customers[0].should.have.property('phone');
                res.body.customers[0].should.have.property('email');
            done();
          });
    });
  });
})