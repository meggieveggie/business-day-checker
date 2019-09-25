
import app from '../src/api';
import chai from 'chai';
import chaiHttp  from 'chai-http';
import { DateTime, Duration } from "luxon"

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
    describe('# businessDates API', function() {
        var dt = DateTime.fromFormat('December 25 2018', "LLLL dd yyyy");
        var expectedResult = {
            "initialQuery": {
                "initialDate": dt.toISO(),
                "delay": 20,
                "timezone": "UTC+1"
            },
            "results": {
                "businessDate":  dt.plus(Duration.fromObject({days: 30})).toISO(),
                "totalDays": 30,
                "holidayDays": 3,
                "weekendDays": 8
            }
        }   
        it("GET /api/v1/businessDates/* should return specified payload", () => {
            chai.request(app)
                .get('/api/v1/businessDates/*')
                .query({
                    "initialDate": dt.toISO(),
                    "delay": 20,
                    "timezone": "UTC+1"
                })
                .end((err, res) => {
                    expect(res.body).to.deep.equal(expectedResult)
                });
        });
        it("POST /api/v1/businessDates/* should return specified payload", () => {
            chai.request(app)
                .post('/api/v1/businessDates/*')
                .set('content-type', 'application/json')
                .send({
                    "initialDate": dt.toISO(),
                    "delay": 20,
                    "timezone": "UTC+1"
                })
                .end((err, res) => {
                    expect(res.body).to.deep.equal(expectedResult)
                });
        });
    });
    describe('# Is Business Day API', function(){
        it("GET /api/v1/isBusinessDay/ returns true when business day", () => {
            var dt = DateTime.fromFormat('November 12 2018', "LLLL dd yyyy");
            var expectedResult = {
                "isBusinessDay": true
            }
            chai.request(app)
                .get('/api/v1/isBusinessDay/')
                .query({
                    "date": dt.toISO()
                })
                .end((err, res) => {
                    expect(res.body).to.deep.equal(expectedResult)
                });
        });
        it("GET /api/v1/isBusinessDay/ returns false when not business day", () => {
            var dt = DateTime.fromFormat('November 10 2018', "LLLL dd yyyy");
            var expectedResult = {
                "isBusinessDay": false
            }
            chai.request(app)
                .get('/api/v1/isBusinessDay/')
                .query({
                    "date": dt.toISO()
                })
                .end((err, res) => {
                    expect(res.body).to.deep.equal(expectedResult)
                });
        });
});

});
