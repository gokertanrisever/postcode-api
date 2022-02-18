import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import path from 'path';

chai.use(chaiHttp);
const should = chai.should();

describe('/healthcheck', () => {
	it('should return 200', (done) => {
		chai.request('http://localhost:3000/api')
			.get('/healthcheck')
			.end((err, res) => {
        if (err) throw err;
				res.should.have.status(200);
        done();
			});
	});
});

describe('/import', () => {
  it('should import csv file async and return 200', (done) => {
    chai.request('http://localhost:3000/api')
      .post('/import')
      .set('Content-Type', 'multipart/form-data')
      .attach('file', fs.readFileSync(path.resolve('./tests/test.csv')), 'test.csv')
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        done();
      });
  });
});

describe('/search', () => {
  it('should return search results as an array', (done) => {
    chai.request('http://localhost:3000/api')
      .get('/search')
      .query({
        lat: '59.875286',
        long: '-1.307502',
        radius: '10',
      })
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        should.exist(res.body);
        res.body.should.be.a('array');
        done();
      });
  });
});
