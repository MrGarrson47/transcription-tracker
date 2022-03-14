import classes from "./Calendar.module.css";
import { getTotalDaysForCalendar, getDateObjectFromString } from "./dayCalcFunctions";
import DropdownDate from "./DropdownDate";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { stringFromDateObject } from "../../generalDateFunctions";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const currentDate = getDateObjectFromString(useSelector((state) => state.selectedDate))
  const selectedDay = useSelector((state) => state.selectedDay)
  const selectedYear = currentDate.getFullYear();
  const selectedMonth = currentDate.getMonth();
  const selectedMonthAsText = months[currentDate.getMonth()];
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const dispatch = useDispatch();

  const add1ToYear = () => {
    let newYear = selectedYear + 1;
    return stringFromDateObject(new Date(newYear, selectedMonth, 1));
  }

  const subtract1FromYear = () =>{
    let newYear = selectedYear - 1;
    return stringFromDateObject(new Date(newYear, selectedMonth, 1));
  }

  const yearDropdownHandler = () => {
    setShowYearDropdown(state => !state);
  }

  const nextYearBtnHandler = () => {
    dispatch({
      type: "UPDATE YEAR",
      payload: {
        selectedDate: add1ToYear(),
        selectedDay: 1
      }
    });
  }

  const previousYearBtnHandler = () => {
    dispatch({
      type: "UPDATE YEAR",
      payload: {
        selectedDate: subtract1FromYear(),
        selectedDay: 1
      }
    });
  }

  const nextMonthBtnHandler = () => {
    dispatch({ type: "NEXT MONTH", payload: 1 });
  }

  const previousMonthBtnHandler = () => {
    dispatch({ type: "PREVIOUS MONTH", payload: -1 })
  }

  const selectDayHandler = (e) => {
    let idString = e.target.id;
    let idArray = idString.split("-");
    let [targetDate, indexOfDayInGrid, gridLength] = idArray;
    dispatch({ type: "SELECT DAY", payload: parseInt(targetDate) });
  }

  const getWeekColumnHeaders = () => {
    return weekDays.map(day => <div className={classes.weekHeader}><p className={classes.weekHeaderText}>{day}</p></div>)
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
    return <div className={classes.dayBlank} id={`${day}-${index}-${totalDays}`}><p className={classes.dayText}>{day}</p></div>
  }

  const getCalendarDay = (day, index, totalDays) => {
    return <div onClick={selectDayHandler} className={day === selectedDay ? classes.dayActive : classes.dayPassive} id={`${day}-${index}-${totalDays}`}><p className={classes.dayText}>{day}</p></div>
  }

  return (
    <div className={classes.calendarMainContainer}>
      <div className={classes.yearContainer}>
        <DropdownDate isOpen={showYearDropdown} />
        <div className={classes.yearArrowContainerLeft} onClick={previousYearBtnHandler}>
          <div className={classes.yearArrowLeft}></div>
        </div>
        <div className={classes.yearTextContainer} onClick={yearDropdownHandler}>
          <p className={classes.yearText}>{selectedYear}</p>
        </div>

        <div className={classes.yearArrowContainerRight} onClick={nextYearBtnHandler}>
          <div className={classes.yearArrowRight}></div>
        </div>
      </div>
      <div className={classes.monthContainer}>
        <div className={classes.arrowContainerLeft} onClick={previousMonthBtnHandler}>
          <div className={classes.arrowLeft}></div>
        </div>
        <div className={classes.monthTextContainer}>
          <p className={classes.monthText} id={"monthText"}>{selectedMonthAsText}</p>
        </div>
        <div className={classes.arrowContainerRight} onClick={nextMonthBtnHandler}>
          <div className={classes.arrowRight}></div>
        </div>
      </div>
      <div className={classes.daysContainer}>
        {getWeekColumnHeaders()}
        {generateDayGridItems(getTotalDaysForCalendar(currentDate))}
      </div>
    </div>
  )
}

export default Calendar;