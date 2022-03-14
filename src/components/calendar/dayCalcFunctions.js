
const daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//have to seperate functions that return html, and functions that generate data which is needed for the html

// get the total days in the selected month -- done (use getThisMonth)
// get the days in the previous month -- done (use getThisMonth)
// get the first weekday of the selected month -- done
// get the dates of the days, from the previous month, that need to be shown on the calendar -- done
// get the total amount of 'days' (previous months last days + selected month days) -- done

export const getDateObjectFromString = (dateString)=> new Date(dateString);

export const getTotalDaysForCalendar = (currentDateString) => {
    let currentDateAsObject = getDateObjectFromString(currentDateString);
    return [...getDatesFromPrevMonthToInclude(currentDateAsObject), ...getDatesInSelectedMonth(currentDateAsObject), ...getDatesInNextMonth(currentDateAsObject)];

}

const getDatesFromPrevMonthToInclude = (currentDate) => {
    let totalDaysOfPrevMonth = getDaysInPrevMonth(currentDate);
    let numberOfDaysToInclude = getFirstWeekdayOfMonthAsIndex(currentDate);
    let arrayOfDays = [];

    for (numberOfDaysToInclude; numberOfDaysToInclude > 0; numberOfDaysToInclude--) {
        arrayOfDays.unshift(totalDaysOfPrevMonth);
        totalDaysOfPrevMonth--;
    }
    return arrayOfDays;
}

const getDatesInNextMonth = (currentDate) => {
    let indexOfStartingDay = getFirstWeekdayOfMonthAsIndex(currentDate);
    let daysInCurrentMonth = getDaysInThisMonth(currentDate);
    let sumOfPrevDaysAndCurrentDays = indexOfStartingDay + daysInCurrentMonth;
    let arrayOfDays = [];
    if (sumOfPrevDaysAndCurrentDays > 35) {
        for (let i = 0; i < (42 - sumOfPrevDaysAndCurrentDays); i++) {
            arrayOfDays.push(i + 1);
        }
    }
    else {
        for (let i = 0; i < (35 - sumOfPrevDaysAndCurrentDays); i++) {
            arrayOfDays.push(i + 1);
        }
    }

    return arrayOfDays;
}

// get the total days in the selected month
const getDatesInSelectedMonth = (currentDate) => {
    let dayCount = getDaysInThisMonth(currentDate);
    if (monthIsFebInLeapYear(currentDate)) {
        dayCount++;
    }
    let arrayOfDayDates = [];
    for (let i = 0; i < dayCount; i++) {
        arrayOfDayDates.push(i + 1);
    }
    return arrayOfDayDates;
};

// get this month
const getThisMonth = (currentDate) => currentDate.getMonth();

export const getDaysInThisMonth = (currentDate) => daysInEachMonth[getThisMonth(currentDate)];

// get the days in the previous month
const getDaysInPrevMonth = (currentDate) => {
    if (getThisMonth(currentDate) === 0) {
        return daysInEachMonth[11];
    }
    // check for leap year
    if (monthIsFebInLeapYear(new Date(currentDate.getFullYear(), getThisMonth(currentDate) - 1, 1))) {
        return daysInEachMonth[getThisMonth(currentDate) - 1] + 1;
    }
    return daysInEachMonth[getThisMonth(currentDate) - 1];
}

// get the first weekday of the selected month
export const getFirstWeekdayOfMonthAsIndex = (currentDate) => {
    let newDate = new Date(currentDate.getFullYear(), getThisMonth(currentDate), 1);
    return newDate.getDay();
}

const monthIsFebInLeapYear = (currentDate) => {
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    if (month === 1 && ((year % 4 === 0) || ((year / 100) % 4 === 0))) {
        return true;
    }
    return false
}
