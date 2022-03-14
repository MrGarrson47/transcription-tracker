import { dateObjectFromString, stringFromDateObject } from "./generalDateFunctions";

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
        case "UPDATE DATE": {
            return { ...state, selectedDate: action.payload.selectedDate, selectedDay: action.payload.selectedDay }
        }
        case "SELECT DAY": {
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




