import businessDayChecker from "../src/helpers" 
import chai from 'chai';
import chaiHttp  from 'chai-http';

// Configure chai
chai.use(chaiHttp);
chai.should();

var expect = chai.expect;
describe('# Helpers', function() {
    describe('# Business Day Calculator ', function() {
        it("'November 10 2018', delay 3 should return November 15th, 2 weekend days and 1 holiday day", () => {
            var expectedResult = {
                "businessDate": "November 10 2018",
                "totalDays": 5,
                "holidayDays": 1,
                "weekendDays": 2
            }
            result = businessDayChecker("November 10 2018", 3);
            expect(result).to.equal(expectedResult)
        });
        it("'November 15 2018', delay 3 should return November 19th, 2 weekend days and 0 holiday days", () => {
            var expectedResult = {
                "businessDate": "November 15 2018",
                "totalDays": 4,
                "holidayDays": 0,
                "weekendDays": 2
            }
            result = businessDayChecker("November 10 2018", 3);
            expect(result).to.equal(expectedResult)
        });
        it("'December 25 2018', delay 20 should return January 18th 2019, 8 weekend days and 2 holiday days", () => {
            var expectedResult = {
                "businessDate": "December 25 2018",
                "totalDays": 24,
                "holidayDays": 2,
                "weekendDays": 8
            }
            result = businessDayChecker("November 10 2018", 3);
            expect(result).to.equal(expectedResult)
        });
    });
});
