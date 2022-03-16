import classes from "./CalendarDays.module.css";
import { getDays } from "./dayCalcFunctions";
import { useSelector, useDispatch } from "react-redux";
import { stringFromDateObject, dateObjectFromString } from "../../generalDateFunctions";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarDays = () => {
    const currentDate = dateObjectFromString(useSelector((state) => state.selectedDate))
    const selectedDay = useSelector((state) => state.selectedDay)
    const selectedYear = currentDate.getFullYear();
    const selectedMonth = currentDate.getMonth();
    const dispatch = useDispatch();

    const selectDayHandler = (e) => {
        let [day, newDateString] = chooseDay(e)
        dispatch({
            type: "UPDATE DATE", payload: {
                selectedDay: day,
                selectedDate: newDateString
            }
        })
    }

    const chooseDay = (e) => {
        let idString = e.target.id;
        let idArray = idString.split("-");
        let [day, indexOfDayInGrid, gridLength] = idArray;

        let newDateObject = new Date(selectedYear, selectedMonth, day);
        let newDateString = stringFromDateObject(newDateObject);
        return [day, newDateString];
    }

    const getWeekColumnHeaders = () => {
        return weekDays.map((day, index) => <div key={`weekHeader${index}`} className={classes.weekHeader}><p className={classes.weekHeaderText}>{day}</p></div>)
    }

    const generateDayGridItems = (totalDaysObject) => {
        let totalDays = totalDaysObject.totalDaysArray;
        return totalDays.map((day, index) => {
            if (isBlankDay(index, totalDaysObject)) {
                return getBlankDay(day, index, totalDays.length);
            }
            return getCalendarDay(day, index, totalDays.length)
        })
    }

    const isBlankDay = (indexOfDay, totalDaysObject) => {
        let { countOfDaysInPrevMonth, countOfDaysInCurrentMonth } = totalDaysObject;
        if (indexOfDay < countOfDaysInPrevMonth || (indexOfDay >= countOfDaysInPrevMonth + countOfDaysInCurrentMonth)) {
            return true;
        }
        return false;
    }

    const getBlankDay = (day, index, totalDays) => {
        return <div key={`blank-${index}`} className={classes.dayBlank} id={`${day}-${index}-${totalDays}`}><p className={classes.dayText}>{day}</p></div>
    }

    const getCalendarDay = (day, index, totalDays) => {
        return <div key={`day-${index}`} onClick={selectDayHandler} className={day == selectedDay ? classes.dayActive : classes.dayPassive} id={`${day}-${index}-${totalDays}`}><p className={classes.dayText}>{day}</p></div>
    }

    return (
        <div className={classes.daysContainer}>
            {getWeekColumnHeaders()}
            {generateDayGridItems(getDays(currentDate))}
        </div>
    )
}

export default CalendarDays;