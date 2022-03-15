import classes from "./CalendarMonth.module.css"
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { stringFromDateObject, dateObjectFromString } from "../../generalDateFunctions";
import { useState } from "react";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const variants = {
    initial: (custom) => custom === "RIGHT" ?
        { top: "50%", translateY: "-50%", left: "-50%", translateX: "0%", opacity: 0.5 } :
        { top: "50%", translateY: "-50%", left: "100%", translateX: "0%", opacity: 0.5 },
    animate: (custom) => custom === "RIGHT" ?
        { top: "50%", translateY: "-50%", left: "50%", translateX: "-50%", opacity: 1 } : { top: "50%", translateY: "-50%", left: "50%", translateX: "-50%", opacity: 1 },
    exit: (custom) => custom === "RIGHT" ?
        { top: "50%", translateY: "-50%", left: "130%", translateX: "0%", opacity: 0.3 } :
        { top: "50%", translateY: "-50%", left: "-30%", translateX: "0%", opacity: 0.3 }
}

const CalendarMonth = () => {
    const currentDate = dateObjectFromString(useSelector((state) => state.selectedDate))
    const selectedYear = currentDate.getFullYear();
    const selectedMonth = currentDate.getMonth();
    const selectedMonthAsText = months[currentDate.getMonth()];
    const dispatch = useDispatch();
    const [direction, setDirection] = useState("RIGHT");

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

    const nextMonthBtnHandler = () => {
        setDirection("RIGHT");
        dispatch({
            type: "UPDATE DATE",
            payload: {
                selectedDate: add1Month(),
                selectedDay: 1
            }
        });
    }

    const previousMonthBtnHandler = () => {
        setDirection("LEFT");
        dispatch({
            type: "UPDATE DATE",
            payload: {
                selectedDate: subtract1Month(),
                selectedDay: 1
            }
        });
    }

    return (
        <div className={classes.monthContainer}>
            <div className={classes.arrowContainerLeft} onClick={previousMonthBtnHandler}>
                <div className={classes.arrowLeft}></div>
            </div>
            <div className={classes.monthTextContainer}>
                <AnimatePresence initial={false} custom={direction}>
                    <motion.p
                        className={classes.monthText} id={"monthText"}
                        key={selectedMonth}
                        variants={variants}
                        custom={direction}
                        initial={"initial"}
                        animate={"animate"}
                        exit={"exit"}
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
    )
}

export default CalendarMonth;