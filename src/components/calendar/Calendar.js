import classes from "./Calendar.module.css";
import CalendarYear from "./CalendarYear";
import CalendarMonth from "./CalendarMonth";
import CalendarDays from "./CalendarDays";
import WeekHeader from "./WeekHeader";

const Calendar = () => {

  return (
    <div className={classes.calendarMainContainer}>
      <CalendarYear />
      <CalendarMonth />
      <WeekHeader/>
      <CalendarDays/>
    </div>
  )
}

export default Calendar;