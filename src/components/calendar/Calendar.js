import classes from "./Calendar.module.css";
import CalendarYear from "./CalendarYear";
import CalendarMonth from "./CalendarMonth";
import CalendarDays from "./CalendarDays";
import WeekHeader from "./WeekHeader";
import { motion } from "framer-motion";

const Calendar = (props) => {


  return (
    <>
    {props.showCalendar && <motion.div
      className={classes.calendarMainContainer}
      initial={{ y: -50, position: "absolute", opacity: 0 }}
      animate={{y:50, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
    >
      <CalendarYear />
      <CalendarMonth />
      <WeekHeader />
      <CalendarDays />
    </motion.div>}
    </>
  )
}

export default Calendar;