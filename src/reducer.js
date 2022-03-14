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
            // return { ...state, selectedDate: yearCalculator(state.selectedDate, 1) };
            return yearUpdater(state, action.payload);
        }
        case "PREVIOUS YEAR": {
            // return { ...state, selectedDate: yearCalculator(state.selectedDate, -1) };
            return yearUpdater(state, action.payload);
        }
        case "NEXT MONTH": {
            return monthUpdater(state, action.payload);
        }
        case "PREVIOUS MONTH": {
            return monthUpdater(state, action.payload);
        }
        case "SELECT DAY": {
            return selectDayUpdater(state, action.payload)
        }
        default: {
            return state;
        }
    }

}

const yearUpdater = (state, payload) =>{
    let dateObject = dateObjectFromString(state.selectedDate);
    let newDateObject = yearCalculator(dateObject, payload);
    let newDateString = stringFromDateObject(newDateObject);
    return {
        ...state,
        selectedDate: newDateString,
        selectedDay: 1
    }
}

const monthUpdater = (state, payload) => {
    let dateObject = dateObjectFromString(state.selectedDate);
    let newDateObject = monthCalculator(dateObject, payload);
    let newDateString = stringFromDateObject(newDateObject)
    return {
        ...state,
        selectedDate: newDateString,
        selectedDay: 1
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




