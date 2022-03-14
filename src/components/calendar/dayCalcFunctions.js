const getDateObjectFromString = (dateString) => new Date(dateString);

export const getDays = (currentDate) => {
    let currentDateAsObject = getDateObjectFromString(currentDate);
    let arrayOfDatesForPrevMonth = getArrayOfDaysInPrevMonth(currentDateAsObject);
    let arrayOfDatesForCurrentMonth = getArrayOfDaysInCurrentMonth(currentDateAsObject);
    let arrayOfDatesForNextMonth = getArrayOfDaysInNextMonth(currentDateAsObject);

    return {
        totalDaysArray: [...arrayOfDatesForPrevMonth, ...arrayOfDatesForCurrentMonth, ...arrayOfDatesForNextMonth],
        countOfDaysInPrevMonth: arrayOfDatesForPrevMonth.length,
        countOfDaysInCurrentMonth: arrayOfDatesForCurrentMonth.length,
        countOfDaysInNextMonth: arrayOfDatesForNextMonth.length
    }
}

const getArrayOfDaysInPrevMonth = (currentDate) => {
    let daysInPrevMonth = getCountOfDaysInPrevMonth(currentDate);
    let firstWeekDayOfCurrentMonth = getFirstWeekdayOfCurrentMonthAsIndex(currentDate);
    let arrayOfDays = [];
    for (firstWeekDayOfCurrentMonth; firstWeekDayOfCurrentMonth > 0; firstWeekDayOfCurrentMonth--) {
        arrayOfDays.unshift(daysInPrevMonth);
        daysInPrevMonth--;
    }
    return arrayOfDays;
}

const getArrayOfDaysInCurrentMonth = (currentDate) => {
    let daysInCurrentMonth = getCountOfDaysInCurrentMonth(currentDate);
    let arrayOfDays = [];
    for (let i = 0; i < daysInCurrentMonth; i++) {
        arrayOfDays.push(i + 1);
    }
    return arrayOfDays;
}

const getArrayOfDaysInNextMonth = (currentDate) => {
    let daysToAdd = 6 - getLastWeekdayOfCurrentMonthAsIndex(currentDate);
    let arrayOfDays = [];
    for (let i = 0; i < daysToAdd; i++) {
        arrayOfDays.push(i + 1);
    }
    return arrayOfDays;
}

const getCountOfDaysInPrevMonth = (currentDate) => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
}

const getCountOfDaysInCurrentMonth = (currentDate) => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
}

const getLastWeekdayOfCurrentMonthAsIndex = (currentDate) => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDay();
}

const getFirstWeekdayOfCurrentMonthAsIndex = (currentDate) => {
    let newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    return newDate.getDay();
}
