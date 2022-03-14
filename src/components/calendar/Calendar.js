import classes from "./Calendar.module.css";
import { getTotalDaysForCalendar, getFirstWeekdayOfMonthAsIndex, getDaysInThisMonth, getDateObjectFromString } from "./dayCalcFunctions";
import DropdownDate from "./DropdownDate";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const currentDate = getDateObjectFromString(useSelector((state) => state.selectedDate))
  const selectedDay = useSelector((state) => state.selectedDay)
  const yearText = currentDate.getFullYear();
  const monthText = months[currentDate.getMonth()];
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const dispatch = useDispatch();

  // let dateString = currentDate.toString();
  // let dateObjectFromString = new Date(dateString);

  // console.log(dateObjectFromString.getFullYear())

  const yearDropdownHandler = () => {
    setShowYearDropdown(state => !state);
  }

  const nextYearBtnHandler = () => {
    dispatch({ type: "NEXT YEAR" });
  }

  const previousYearBtnHandler = () => {
    dispatch({ type: "PREVIOUS YEAR" });
  }

  const nextMonthBtnHandler = () => {
    dispatch({ type: "NEXT MONTH" });
  }

  const previousMonthBtnHandler = () => {
    dispatch({ type: "PREVIOUS MONTH" })
  }

  const selectDayHandler = (e) => {
    //dispatch({ type: "SELECT DAY", payload: parseInt(e.target.id) });
    let idString = e.target.id;
    let idArray = idString.split("-");
    let [targetDate, indexOfDayInGrid, gridLength] = idArray;
    dispatch({ type: "SELECT DAY", payload: parseInt(targetDate) });
  }

  const getWeekColumnHeaders = () => {
    return weekDays.map(day => <div className={classes.weekHeader}><p className={classes.weekHeaderText}>{day}</p></div>)
  }

  const generateDayGridItems = (totalDays) => {
    let indexOfNextMonthsBlanks = getFirstWeekdayOfMonthAsIndex(currentDate) + getDaysInThisMonth(currentDate);
    let classToUse;
    return totalDays.map((day, index) => {
      if ((index < getFirstWeekdayOfMonthAsIndex(currentDate)) || index >= indexOfNextMonthsBlanks) {
        return <div className={classes.dayBlank} id={index - 1}><p className={classes.dayText}>{day}</p></div>
      }
      classToUse = index - 1 === selectedDay ? classes.dayActive : classes.dayPassive;
      return <div onClick={selectDayHandler} className={classToUse} id={`${day}-${index}-${totalDays.length}`}><p className={classes.dayText}>{day}</p></div>
    })
  }

  return (
    <div className={classes.calendarMainContainer}>
      <div className={classes.yearContainer}>
        <DropdownDate isOpen={showYearDropdown} />
        <div className={classes.yearArrowContainerLeft} onClick={previousYearBtnHandler}>
          <div className={classes.yearArrowLeft}></div>
        </div>
        <div className={classes.yearTextContainer} onClick={yearDropdownHandler}>
          <p className={classes.yearText}>{yearText}</p>
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
          <p className={classes.monthText} id={"monthText"}>{monthText}</p>
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