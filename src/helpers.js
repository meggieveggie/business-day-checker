import { DateTime } from "luxon"
import calculator from "business-days-calculator"
import Holidays from "date-holidays"

/**
 * Function takes date time with delay and calculates final day after delay 
 * Calculates total days, holiday days and weekend days
 * @param {string} dateTime inital date
 * @param {int}    delay    amount of business days for process to finish
 */  
export default function businessDayChecker (dateTime, delay){
    var date = new Date(dateTime);
    var startDate = new Date(dateTime);
    startDate.setDate(startDate.getDate() + 1)
    var hd = new Holidays();
    hd.init({country: 'US'})

    var count = 0;
    var holidayDays = 0;
    var weekendDays = 0;

    while(count < delay){
        if(!calculator.IsBusinessDay(date)){
            weekendDays++
        }
        else if(hd.isHoliday(date) && hd.isHoliday(date).type === "public"){
            holidayDays++
        }
        else{
            count++
        }
        date.setDate(date.getDate() + 1)
    }
    var res = Math.abs(startDate - date) / 1000 
    var totalDays = Math.floor(res / 86400)
    return {
            "businessDate": dateTime,
            "totalDays": totalDays,
            "holidayDays": holidayDays,
            "weekendDays": weekendDays 
    }
};