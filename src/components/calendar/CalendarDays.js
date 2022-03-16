import classes from "./CalendarDays.module.css";
import { getDays } from "./dayCalcFunctions";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { stringFromDateObject, dateObjectFromString } from "../../generalDateFunctions";

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

    const generateDayGridItems = (totalDaysObject) => {
        let totalDays = totalDaysObject.totalDaysArray;
        let animationDelayTimings = getAnimationDelayTimings(totalDays.length);
        return totalDays.map((day, index) => {
            if (isBlankDay(index, totalDaysObject)) {
                return getBlankDay(day, index, totalDays.length, animationDelayTimings[index]);
            }
            return getCalendarDay(day, index, totalDays.length, animationDelayTimings[index])
        })
    }

    const getAnimationDelayTimings = (totalDaysLength)=>{
        let animationDelayTimings = [];
        for (let i = 0; i < totalDaysLength; i++) {
            animationDelayTimings.push((i + 1) / 30);
        }
        return animationDelayTimings;
    }

    const isBlankDay = (indexOfDay, totalDaysObject) => {
        let { countOfDaysInPrevMonth, countOfDaysInCurrentMonth } = totalDaysObject;
        if (indexOfDay < countOfDaysInPrevMonth || (indexOfDay >= countOfDaysInPrevMonth + countOfDaysInCurrentMonth)) {
            return true;
        }
        return false;
    }

    const getBlankDay = (day, index, totalDays, delay) => {
        return <motion.div
            key={`blank-${index}${selectedMonth}${selectedYear}`}
            className={classes.dayBlank}
            id={`${day}-${index}-${totalDays}`}
            initial={{ y: -50, x: -50, opacity: 0 }}
            animate={{ y: 0, x: 0, opacity: 1 }}
            transition={{ duration: .4, delay: delay }}
        >
            <p className={classes.dayText}>{day}</p>
        </motion.div>
    }

    const getCalendarDay = (day, index, totalDays, delay) => {
        return <motion.div
            key={`day-${index}${selectedMonth}${selectedYear}`}
            onClick={selectDayHandler}
            className={day == selectedDay ? classes.dayActive : classes.dayPassive}
            id={`${day}-${index}-${totalDays}`}
            initial={{y: -50, x: -50, opacity: 0}}
            animate={{y: 0, x: 0, opacity: 1}}
            transition={{duration: .4, delay: delay}}      
        >
            <p className={classes.dayText}>{day}</p>
        </motion.div>
    }

    return (
        <div className={classes.daysContainer}>
            {generateDayGridItems(getDays(currentDate))}
        </div>
    )
}

export default CalendarDays;