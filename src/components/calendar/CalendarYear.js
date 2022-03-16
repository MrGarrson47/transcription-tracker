import classes from "./CalendarYear.module.css";
import { stringFromDateObject, dateObjectFromString } from "../../generalDateFunctions";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const variant = {
    initial: (custom) => custom === "LEFT" ?
        { top: "50%", translateY: "-50%", left: "-50%", translateX: "0%", opacity: 0.5 } :
        { top: "50%", translateY: "-50%", left: "100%", translateX: "0%", opacity: 0.5 },
    animate: (custom) => custom === "LEFT" ?
        { top: "50%", translateY: "-50%", left: "50%", translateX: "-50%", opacity: 1 } : { top: "50%", translateY: "-50%", left: "50%", translateX: "-50%", opacity: 1 },
    exit: (custom) => custom === "LEFT" ?
        { top: "50%", translateY: "-50%", left: "130%", translateX: "0%", opacity: 0.3 } :
        { top: "50%", translateY: "-50%", left: "-30%", translateX: "0%", opacity: 0.3 }
}


const CalendarYear = () => {

    const currentDate = dateObjectFromString(useSelector((state) => state.selectedDate))
    const selectedYear = currentDate.getFullYear();
    const selectedMonth = currentDate.getMonth();
    const dispatch = useDispatch();
    const [direction, setDirection] = useState("RIGHT");

    const add1Year = () => {
        let newYear = selectedYear + 1;
        return stringFromDateObject(new Date(newYear, selectedMonth, 1));
    }

    const subtract1Year = () => {
        let newYear = selectedYear - 1;
        return stringFromDateObject(new Date(newYear, selectedMonth, 1));
    }

    const nextYearBtnHandler = () => {
        setDirection("RIGHT");
        dispatch({
            type: "UPDATE DATE",
            payload: {
                selectedDate: add1Year(),
                selectedDay: 1
            }
        });
    }

    const previousYearBtnHandler = () => {
        setDirection("LEFT");
        dispatch({
            type: "UPDATE DATE",
            payload: {
                selectedDate: subtract1Year(),
                selectedDay: 1
            }
        });
    }


    return (
        <div className={classes.yearContainer}>
            <div className={classes.yearArrowContainerLeft} onClick={previousYearBtnHandler}>
                <div className={classes.yearArrowLeft}></div>
            </div>
            <div className={classes.yearTextContainer}>
                <AnimatePresence initial={false} custom={direction}>
                    <motion.p
                        className={classes.yearText} id={"yearText"}
                        custom={direction}
                        key={selectedYear}
                        variants={variant}
                        initial={"initial"}
                        animate={"animate"}
                        exit={"exit"}
                        transition={{ duration: .5 }}
                    >
                        {selectedYear}
                    </motion.p>
                </AnimatePresence>
            </div>

            <div className={classes.yearArrowContainerRight} onClick={nextYearBtnHandler}>
                <div className={classes.yearArrowRight}></div>
            </div>
        </div>
    )
}

export default CalendarYear;