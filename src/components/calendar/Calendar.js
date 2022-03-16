import classes from "./Calendar.module.css";
import CalendarYear from "./CalendarYear";
import CalendarMonth from "./CalendarMonth";
import CalendarDays from "./CalendarDays";

const Calendar = () => {

  return (
    <div className={classes.calendarMainContainer}>
      <CalendarYear />
      <CalendarMonth />
      <CalendarDays/>
    </div>
  )
}

export default Calendar;