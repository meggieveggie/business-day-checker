import { DateTime, Duration } from "luxon"
import calculator from "business-days-calculator"
import Holidays from "date-holidays"

/**
 * Function takes date time with delay and calculates final day after delay 
 * Calculates total days, holiday days and weekend days
 * @param {string} dateTime inital date
 * @param {int}    delay    amount of business days for process to finish
 */  
export function businessDayChecker (dateTime, delay, locale='US'){
    var date = DateTime.fromISO(dateTime)
    var startDate = DateTime.fromISO(dateTime)
    var hd = new Holidays();
    hd.init({country: locale})

    var count = 0;
    var holidayDays = 0;
    var weekendDays = 0;

    while(count < delay){
        if(!calculator.IsBusinessDay(date.toJSDate())){
            weekendDays++
        }
        else if(hd.isHoliday(date.toJSDate()) && hd.isHoliday(date.toJSDate()).type === "public"){
            holidayDays++
        }
        else{
            count++
            if (count === delay){
                break;
            }
        }
        date = date.plus(Duration.fromObject({days: 1}))
    }
    var res = Math.abs(startDate - date) / 1000 
    var totalDays = Math.floor(res / 86400)
    return {
            "businessDate": date.toISO(),
            "totalDays": totalDays,
            "holidayDays": holidayDays,
            "weekendDays": weekendDays 
    }
};

/**
 * Formats response for client
 * @param {object} initialQuery object with a key of inital date and delay 
 */
export function formatResponse (initialQuery){
    var results = businessDayChecker(initialQuery.initialDate, initialQuery.delay, initialQuery.locale)  
    return {
        "initialQuery": initialQuery,
        "results": results
    }
};

export default {businessDayChecker, formatResponse}