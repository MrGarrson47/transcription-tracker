import classes from "./Calendar.module.css";
import { getDays } from "./dayCalcFunctions";
import DropdownDate from "./DropdownDate";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { stringFromDateObject, dateObjectFromString } from "../../generalDateFunctions";
import CalendarYear from "./CalendarYear";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const currentDate = dateObjectFromString(useSelector((state) => state.selectedDate))
  const selectedDay = useSelector((state) => state.selectedDay)
  const selectedYear = currentDate.getFullYear();
  const selectedMonth = currentDate.getMonth();
  const selectedMonthAsText = months[currentDate.getMonth()];
  const dispatch = useDispatch();
  const monthAnimateRight = useSelector(state => state.monthAnimateRight);
  const monthKey = useSelector((state) => state.monthKey);

  const variants = {
    initialGoingRight: { top: "50%", translateY: "-50%", left: "-50%", opacity: 0.5 },
    initialGoingLeft: { top: "50%", translateY: "-50%", right: "0%", opacity: 0.5 },
    animateGoingRight: { top: "50%", translateY: "-50%", left: "50%", translateX: "-50%", opacity: 1 },
    animateGoingLeft: { top: "50%", translateY: "-50%", right: "50%", translateX: "50%", opacity: 1 },
    exitGoingRight: { top: "50%", translateY: "-50%", left: "130%", opacity: 0.5 },
    exitGoingLeft: { top: "50%", translateY: "-50%", right: "130%", opacity: 0.5 }
  }

  const add1Month = () => {
    let newMonth = selectedMonth + 1;
    newMonth = newMonth > 11 ? 0 : newMonth < 0 ? 11 : newMonth;
    return stringFromDateObject(new Date(selectedYear, newMonth, 1));
  }

  const subtract1Month = () => {
    let newMonth = selectedMonth - 1;
    newMonth = newMonth > 11 ? 0 : newMonth < 0 ? 11 : newMonth;
    return stringFromDateObject(new Date(selectedYear, newMonth, 1));
  }

  const chooseDay = (e) => {
    let idString = e.target.id;
    let idArray = idString.split("-");
    let [day, indexOfDayInGrid, gridLength] = idArray;

    let newDateObject = new Date(selectedYear, selectedMonth, day);
    let newDateString = stringFromDateObject(newDateObject);
    return [day, newDateString];
  }

  const nextMonthBtnHandler = () => {
    dispatch({
      type: "UPDATE DATE",
      payload: {
        selectedDate: add1Month(),
        selectedDay: 1,
        monthKey: monthKey + 1,
        monthAnimateRight: "YES"
      }
    });
  }

  const previousMonthBtnHandler = () => {
    dispatch({
      type: "UPDATE DATE",
      payload: {
        selectedDate: subtract1Month(),
        selectedDay: 1,
        monthKey: monthKey + 1,
        monthAnimateRight: "NO"
      }
    });
  }

  const selectDayHandler = (e) => {
    let [day, newDateString] = chooseDay(e)
    dispatch({
      type: "UPDATE DATE", payload: {
        selectedDay: day,
        selectedDate: newDateString
      }
    })
  }

  const getWeekColumnHeaders = () => {
    return weekDays.map((day, index) => <div key={`weekHeader${index}`} className={classes.weekHeader}><p className={classes.weekHeaderText}>{day}</p></div>)
  }

  const isBlankDay = (indexOfDay, totalDaysObject) => {
    let { countOfDaysInPrevMonth, countOfDaysInCurrentMonth } = totalDaysObject;
    if (indexOfDay < countOfDaysInPrevMonth || (indexOfDay >= countOfDaysInPrevMonth + countOfDaysInCurrentMonth)) {
      return true;
    }
    return false;
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

  const getBlankDay = (day, index, totalDays) => {
    return <div key={`blank-${index}`} className={classes.dayBlank} id={`${day}-${index}-${totalDays}`}><p className={classes.dayText}>{day}</p></div>
  }

  const getCalendarDay = (day, index, totalDays) => {
    return <div key={`day-${index}`} onClick={selectDayHandler} className={day == selectedDay ? classes.dayActive : classes.dayPassive} id={`${day}-${index}-${totalDays}`}><p className={classes.dayText}>{day}</p></div>
  }

  return (
    <div className={classes.calendarMainContainer}>
      <CalendarYear />
      <div className={classes.monthContainer}>
        <div className={classes.arrowContainerLeft} onClick={previousMonthBtnHandler}>
          <div className={classes.arrowLeft}></div>
        </div>
        <div className={classes.monthTextContainer}>
          <AnimatePresence>
            <motion.p
              key={monthKey}
              className={classes.monthText} id={"monthText"}
              variants={variants}
              initial={monthAnimateRight === "YES" ? "initialGoingRight" : "initialGoingLeft"}
              animate={monthAnimateRight === "YES" ? "animateGoingRight" : "animateGoingLeft"}
              exit={monthAnimateRight === "YES" ? "exitGoingRight" : "exitGoingLeft"}
              transition={{ duration: .5 }}
            >
              {selectedMonthAsText}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className={classes.arrowContainerRight} onClick={nextMonthBtnHandler}>
          <div className={classes.arrowRight}></div>
        </div>
      </div>
      <div className={classes.daysContainer}>
        {getWeekColumnHeaders()}
        {generateDayGridItems(getDays(currentDate))}
      </div>
    </div>
  )
}

export default Calendar;