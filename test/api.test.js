
import app from '../src/api';
import chai from 'chai';
import chaiHttp  from 'chai-http';

// Configure chai
chai.use(chaiHttp);
chai.should();

var expect = chai.expect;
describe('# API', function() {
    describe('# health API', function() {
        it("GET /healthz should return 200", () => {
            chai.request(app)
                .get('/healthz')
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                });
        });
    });
});
