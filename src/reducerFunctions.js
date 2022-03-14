export const yearCalculator = (dateObject, value) => {
    let [year, month, day] = [dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate()];
    let newYear = year + value;
    if (newYear <= 2040 && newYear >= 2000) {
        return new Date(newYear, month, day);
    }
    return new Date(year, month, day);
}

export const monthCalculator = (dateObject, value) => {
    let [year, month, day] = [dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate()];
    let newMonth = month + value;
    newMonth = newMonth > 11 ? 0 : newMonth < 0 ? 11 : newMonth;
    return new Date(year, newMonth, day);
}