export const yearCalculator = (dateObject, payload) => {
    let [year, month] = [dateObject.getFullYear(), dateObject.getMonth()];
    let newYear = year + payload;
    return new Date(newYear, month, 1);
}

export const monthCalculator = (dateObject, payload) => {
    let [year, month] = [dateObject.getFullYear(), dateObject.getMonth()];
    let newMonth = month + payload;
    newMonth = newMonth > 11 ? 0 : newMonth < 0 ? 11 : newMonth;
    return new Date(year, newMonth, 1);
}