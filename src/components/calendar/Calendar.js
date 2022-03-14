import classes from "./Calendar.module.css";
import { getDays, getTotalDaysForCalendar } from "./dayCalcFunctions";
import DropdownDate from "./DropdownDate";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { stringFromDateObject, dateObjectFromString } from "../../generalDateFunctions";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const currentDate = dateObjectFromString(useSelector((state) => state.selectedDate))
  const selectedDay = useSelector((state) => state.selectedDay)
  const selectedYear = currentDate.getFullYear();
  const selectedMonth = currentDate.getMonth();
  const selectedMonthAsText = months[currentDate.getMonth()];
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const dispatch = useDispatch();

  const add1Year = () => {
    let newYear = selectedYear + 1;
    return stringFromDateObject(new Date(newYear, selectedMonth, 1));
  }

  const subtract1Year = () => {
    let newYear = selectedYear - 1;
    return stringFromDateObject(new Date(newYear, selectedMonth, 1));
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

  const chooseDay = (e)=>{
    let idString = e.target.id;
    let idArray = idString.split("-");
    let [day, indexOfDayInGrid, gridLength] = idArray;

    let newDateObject = new Date(selectedYear, selectedMonth, day);
    let newDateString = stringFromDateObject(newDateObject);
    return [day, newDateString];
  }

  const yearDropdownHandler = () => {
    setShowYearDropdown(state => !state);
  }

  const nextYearBtnHandler = () => {
    dispatch({
      type: "UPDATE DATE",
      payload: {
        selectedDate: add1Year(),
        selectedDay: 1
      }
    });
  }

  const previousYearBtnHandler = () => {
    dispatch({
      type: "UPDATE DATE",
      payload: {
        selectedDate: subtract1Year(),
        selectedDay: 1
      }
    });
  }

  const nextMonthBtnHandler = () => {
    dispatch({
      type: "UPDATE DATE",
      payload: {
        selectedDate: add1Month(),
        selectedDay: 1
      }
    });
  }

  const previousMonthBtnHandler = () => {
    dispatch({
      type: "UPDATE DATE",
      payload: {
        selectedDate: subtract1Month(),
        selectedDay: 1
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
        {generateDayGridItems(getDays(currentDate))}
      </div>
    </div>
  )
}

export default Calendar;