import { businessDayChecker, formatResponse } from "../src/helpers" 
import chai from 'chai';
import chaiHttp  from 'chai-http';
import { DateTime, Duration } from "luxon"

// Configure chai
chai.use(chaiHttp);
chai.should();

var expect = chai.expect;
describe('# Helpers', function() {
    describe('# Business Day Calculator ', function() {
        it("'November 10 2018', delay 3 should return November 15th, 2 weekend days and 1 holiday day", () => {
            var dt = DateTime.fromFormat('November 10 2018', "LLLL dd yyyy");
            var expectedResult = {
                "businessDate": dt.plus(Duration.fromObject({days: 5})).toISO(),
                "totalDays": 5,
                "holidayDays": 1,
                "weekendDays": 2
            }
            var result = businessDayChecker(dt.toString(), 3);
            expect(result).to.deep.equal(expectedResult)
        });
        it("'November 15 2018', delay 3 should return November 19th, 2 weekend days and 0 holiday days", () => {
            var dt = DateTime.fromFormat('November 15 2018', "LLLL dd yyyy");
            var expectedResult = {
                "businessDate": dt.plus(Duration.fromObject({days: 4})).toISO(),
                "totalDays": 4,
                "holidayDays": 0,
                "weekendDays": 2
            }
            var result = businessDayChecker(dt.toString(), 3);
            expect(result).to.deep.equal(expectedResult)
        });
        it("'December 25 2018', delay 20 should return January 24th 2019, 8 weekend days and 3 holiday days", () => {
            var dt = DateTime.fromFormat('December 25 2018', "LLLL dd yyyy");
            var expectedResult = {
                "businessDate": dt.plus(Duration.fromObject({days: 30})).toISO(),
                "totalDays": 30,
                "holidayDays": 3,
                "weekendDays": 8
            }
            var result = businessDayChecker(dt.toString(), 20);
            expect(result).to.deep.equal(expectedResult)
        });
    });
    describe('# Format Response', function() {
        it("Should format the response given the inital data", () => {
            var dt = DateTime.fromFormat('December 25 2018', "LLLL dd yyyy");
            var expectedResult = {
                "initialQuery": {
                  "initialDate": dt.toISO(),
                  "delay": 20
                },
                "results": {
                  "businessDate":  dt.plus(Duration.fromObject({days: 30})).toISO(),
                  "totalDays": 30,
                  "holidayDays": 3,
                  "weekendDays": 8
                }
              }
              var result = formatResponse( 
               {
                "initialDate": dt.toISO(),
                "delay": 20
              });
              expect(result).to.deep.equal(expectedResult)
        })
    });
});
