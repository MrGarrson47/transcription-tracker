import classes from './WeekHeader.module.css';

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeekHeader = () => {

    const getWeekColumnHeaders = () => {
        return weekDays.map((day, index) => <div key={`weekHeader${index}`} className={classes.weekHeader}><p className={classes.weekHeaderText}>{day}</p></div>)
    }

    return (
        <div className={classes.weekHeaderContainer}>
            {getWeekColumnHeaders()}
        </div>
    )
}

export default WeekHeader;