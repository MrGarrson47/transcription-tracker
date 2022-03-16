import classes from "./CalendarHamburger.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { dateObjectFromString } from "../../generalDateFunctions";
import Calendar from "./Calendar";
import calendarIcon from "../../calendarIcon.png";
import { motion, AnimatePresence } from "framer-motion";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const CalendarHamburger = () => {
    const [showHamburger, setShowHamburger] = useState(true);
    const [showCalender, setShowCalendar] = useState(false);
    const currentDate = dateObjectFromString(useSelector(state => state.selectedDate));
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    const showCalenderHandler = () => {
        setShowCalendar(state => !state);
    }

    return (
        <>
            {showHamburger && <div className={classes.hamburgerContainer}>
                <p className={classes.hamburgerDateText}>{`${day} of ${months[month]}, ${year}`}</p>
                <div className={classes.calendarIconContainer} onClick={showCalenderHandler}>
                    <img className={classes.calendarIcon} src={calendarIcon} />
                </div>
            </div>}
            <AnimatePresence>
            {showCalender &&
               
                    <motion.div
                        initial={{y:-200, opacity: 0, scale: 0.3}}
                        animate={{y: 0, opacity: 1, scale: 1}}
                        exit={{y:-200, opacity: 0, scale: 0.3}}
                    >
                        <Calendar />
                    </motion.div>
                
            }
            </AnimatePresence>
        </>

    )
}

export default CalendarHamburger;