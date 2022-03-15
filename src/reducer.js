let currentDate = new Date().toString();
let currentDay = new Date().getDate();
let currentMonth = new Date().getMonth();

const daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const initialDateState = {
    currentDate: currentDate,
    selectedDate: currentDate,
    selectedDay: currentDay,
    monthKey: 1,
    monthAnimateRight: "YES",
    yearKey: 1,
    yearAnimateRight: "YES",
    // need to remove all mentions of daysInEachMonth in state, not using it anywhere
    daysInEachMonth: daysInEachMonth[currentMonth]
}



export const dateReducer = (state = initialDateState, action) => {
    switch (action.type) {
        case "UPDATE DATE": {
            return {
                ...state,
                selectedDate: action.payload.selectedDate,
                selectedDay: action.payload.selectedDay
            }
        }
        default: {
            return state;
        }
    }

}





