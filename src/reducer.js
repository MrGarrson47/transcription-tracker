import { dateObjectFromString, stringFromDateObject } from "./generalDateFunctions";
import { yearCalculator, monthCalculator } from "./reducerFunctions";

let currentDate = new Date().toString();
let currentDay = new Date().getDate();
let currentMonth = new Date().getMonth();

const daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const initialDateState = {
    currentDate: currentDate,
    selectedDate: currentDate,
    selectedDay: currentDay,
    // need to remove all mentions of daysInEachMonth in state, not using it anywhere
    daysInEachMonth: daysInEachMonth[currentMonth]
}



export const dateReducer = (state = initialDateState, action) => {
    switch (action.type) {
        case "NEXT YEAR": {
            return { ...state, selectedDate: yearCalculator(state.selectedDate, 1) };
        }
        case "PREVIOUS YEAR": {
            return { ...state, selectedDate: yearCalculator(state.selectedDate, -1) };
        }
        case "NEXT MONTH": {
            let nextMonthNewDateObject = monthCalculator(state.selectedDate, 1);
            let nextMonthNewDaysCount = daysInEachMonth[nextMonthNewDateObject.getMonth()];
            return { ...state, selectedDate: nextMonthNewDateObject, daysInEachMonth: nextMonthNewDaysCount };
        }
        case "PREVIOUS MONTH": {
            let previousMonthNewDateObject = monthCalculator(state.selectedDate, -1);
            let previousMonthNewDaysCount = daysInEachMonth[previousMonthNewDateObject.getMonth()];
            return { ...state, selectedDate: previousMonthNewDateObject, daysInEachMonth: previousMonthNewDaysCount };
        }
        case "SELECT DAY": {
            // return { ...state, selectedDay: action.payload, selectedDate: new Date(state.selectedDate.getFullYear(), state.selectedDate.getMonth(), action.payload) }
            return selectDayUpdater(state, action.payload)
        }
        default: {
            return state;
        }
    }

}


const selectDayUpdater = (state, payload) => {
    let dateObject = dateObjectFromString(state.selectedDate);
    let newDateObject = new Date(dateObject.getFullYear(), dateObject.getMonth(), payload);
    let newDateString = stringFromDateObject(newDateObject);
    return {
        ...state,
        selectedDay: payload,
        selectedDate: newDateString
    }
}




