import { DateTime } from "luxon"
import calculator from "business-days-calculator"
import Holidays from "date-holidays"

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