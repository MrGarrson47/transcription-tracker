import classes from "./CalendarYear.module.css";
import { stringFromDateObject, dateObjectFromString } from "../../generalDateFunctions";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";


const CalendarYear = () => {

    const currentDate = dateObjectFromString(useSelector((state) => state.selectedDate))
    const selectedYear = currentDate.getFullYear();
    const selectedMonth = currentDate.getMonth();
    const yearAnimateRight = useSelector(state => state.yearAnimateRight);
    const yearKey = useSelector((state) => state.yearKey);
    const dispatch = useDispatch();
    let goRight;

    const variants = {
        initialGoingRight: { top: "50%", translateY: "-50%", left: "-50%", opacity: 0.5 },
        initialGoingLeft: { top: "50%", translateY: "-50%", right: "0%", opacity: 0.5 },
        animateGoingRight: { top: "50%", translateY: "-50%", left: "50%", translateX: "-50%", opacity: 1 },
        animateGoingLeft: { top: "50%", translateY: "-50%", right: "50%", translateX: "50%", opacity: 1 },
        exitGoingRight: { top: "50%", translateY: "-50%", left: "130%", opacity: 0.5 },
        exitGoingLeft: { top: "50%", translateY: "-50%", right: "130%", opacity: 0.5 }
    }

    const add1Year = () => {
        let newYear = selectedYear + 1;
        return stringFromDateObject(new Date(newYear, selectedMonth, 1));
      }
    
      const subtract1Year = () => {
        let newYear = selectedYear - 1;
        return stringFromDateObject(new Date(newYear, selectedMonth, 1));
      }

    const nextYearBtnHandler = () => {
        dispatch({
            type: "UPDATE DATE",
            payload: {
                selectedDate: add1Year(),
                selectedDay: 1,
                yearKey: yearKey + 1,
                yearAnimateRight: "YES"
            }
        });
    }

    const previousYearBtnHandler = () => {
        dispatch({
            type: "UPDATE DATE",
            payload: {
                selectedDate: subtract1Year(),
                selectedDay: 1,
                yearKey: yearKey + 1,
                yearAnimateRight: "NO"
            }
        });
    }


    return (
        <div className={classes.yearContainer}>
            <div className={classes.yearArrowContainerLeft} onClick={previousYearBtnHandler}>
                <div className={classes.yearArrowLeft}></div>
            </div>
            <div className={classes.yearTextContainer}>
                <AnimatePresence>
                    <motion.p
                        key={yearKey}
                        className={classes.yearText} id={"yearText"}
                        variants={variants}
                        initial={yearAnimateRight === "YES" ? "initialGoingRight" : "initialGoingLeft"}
                        animate={yearAnimateRight === "YES" ? "animateGoingRight" : "animateGoingLeft"}
                        exit={yearAnimateRight === "YES" ? "exitGoingRight" : "exitGoingLeft"}
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