const hourLabels = ["00:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00", "05:00-06:00", "06:00-07:00", "07:00-08:00", "08:00-09:00", "09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00", "20:00-21:00", "21:00-22:00", "22:00-23:00", "23:00-00:00"];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const getChartData = (selectByDateTab, selectByCategoryTab, jobData, currentDateAsObject) => {
    let filteredByDate = filteredJobsByDate(selectByDateTab, jobData, currentDateAsObject);
    let filteredByCategory = filteredJobsByCategory(filteredByDate, selectByDateTab, selectByCategoryTab, currentDateAsObject);
    return generateChartInfo(filteredByCategory, selectByDateTab, selectByCategoryTab, currentDateAsObject);
}

const filteredJobsByDate = (selectByDateTab, jobData, currentDateAsObject) => {
    if (selectByDateTab["day"]) {
        return getAllJobsForSelectedDay(jobData, currentDateAsObject);
    }
    if (selectByDateTab["month"]) {
        return getAllJobsForSelectedMonth(jobData, currentDateAsObject);
    }
    if (selectByDateTab["year"]) {
        return jobData;
    }
}

const filteredJobsByCategory = (jobs, selectByDateTab, selectByCategoryTab, currentDateAsObject) => {
    let jobsArray = [];
    if (selectByDateTab["day"]) {
        fillArrayForDaysRange(jobsArray);
        if (selectByCategoryTab["Jobs Received"]) {
            dayJobsReceived(jobsArray, jobs)
        }
        if (selectByCategoryTab["Time Spent"]) {
            dayTimeSpent(jobsArray, jobs)
        }
        if (selectByCategoryTab["Avg Accuracy"]) {
            dayAvgAccuracy(jobsArray, jobs)
        }
        if (selectByCategoryTab["Money Earned"]) {
            dayMoneyEarned(jobsArray, jobs)
        }
    }

    if (selectByDateTab["month"]) {
        fillArrayForMonthRange(jobsArray, currentDateAsObject);

        if (selectByCategoryTab["Jobs Received"]) {
            monthJobsReceived(jobsArray, jobs);
        }

        if (selectByCategoryTab["Time Spent"]) {
            monthTimeSpent(jobsArray, jobs);
        }

        if (selectByCategoryTab["Avg Accuracy"]) {
            monthAvgAccuracy(jobsArray, jobs);
        }

        if (selectByCategoryTab["Money Earned"]) {
            monthMoneyEarned(jobsArray, jobs);
        }
    }

    if (selectByDateTab["year"]) {
        fillArrayForYearRange(jobsArray)

        if (selectByCategoryTab["Jobs Received"]) {
            yearJobsReceived(jobsArray, jobs);
        }

        if (selectByCategoryTab["Time Spent"]) {
            yearTimeSpent(jobsArray, jobs);
        }

        if (selectByCategoryTab["Avg Accuracy"]) {
            yearAvgAccuracy(jobsArray, jobs);
        }

        if (selectByCategoryTab["Money Earned"]) {
            yearMoneyEarned(jobsArray, jobs);
        }
    }
    return jobsArray;
}

const generateChartInfo = (filteredData, selectByDateTab, selectByCategoryTab, currentDateAsObject) => {
    // generate labels based on the days in selected month, just for month date range
    let daysInMonthLabel = [];
    for (let i = 0; i < filteredData.length; i++) {
        daysInMonthLabel.push(`${i + 1} ${months[currentDateAsObject.getMonth()].slice(0, 3)}`);
    }

    let labels = selectByDateTab["day"] ? hourLabels :
        selectByDateTab["month"] ? daysInMonthLabel :
            selectByDateTab["year"] ? months : hourLabels;
    let key = selectByCategoryTab["Jobs Received"] ? "Jobs Received" :
        selectByCategoryTab["Time Spent"] ? "Time Spent" :
            selectByCategoryTab["Avg Accuracy"] ? "Avg Accuracy" :
                selectByCategoryTab["Money Earned"] ? "Money Earned" : null;

    let color = selectByCategoryTab["Jobs Received"] ? "green" :
        selectByCategoryTab["Time Spent"] ? "yellow" :
            selectByCategoryTab["Avg Accuracy"] ? "red" :
                selectByCategoryTab["Money Earned"] ? "blue" : null;
    return {
        labels: labels,
        datasets: [
            {
                label: key,
                backgroundColor: color,
                borderWidth: 2,
                data: filteredData
            }
        ]
    }
}


const getAllJobsForSelectedDay = (jobData, currentDateAsObject) => {
    if (jobData != null) {
        let jobs = [];

        let jobsInMonth = jobData[months[currentDateAsObject.getMonth()]];
        for (let job in jobsInMonth) {
            if (parseInt(jobsInMonth[job]["day"]) === parseInt(currentDateAsObject.getDate())) {
                jobs.push(jobsInMonth[job]);
            }
        }
        return jobs;
    }
    return {};
}

const getAllJobsForSelectedMonth = (jobData, currentDateAsObject) => {
    if (jobData != null) {
        return jobData[months[currentDateAsObject.getMonth()]]
    }
    return {};
}

const fillArrayForDaysRange = (array) => {
    // fill array with 24 zeroes
    for (let i = 0; i < 24; i++) {
        array.push(0);
    }
}

const fillArrayForMonthRange = (array, currentDateAsObject) => {
    let newDateObject = new Date(currentDateAsObject.getFullYear(), currentDateAsObject.getMonth() + 1, 0);
    let daysInThisMonth = newDateObject.getDate();
    for (let i = 0; i < daysInThisMonth; i++) {
        array.push(0);
    }
}

const fillArrayForYearRange = (array) => {
    for (let i = 0; i < 12; i++) {
        array.push(0);
    }
}

const dayJobsReceived = (jobsArray, jobs) => {
    for (let job in jobs) {
        let [jobHour, jobMinute] = jobs[job]["time received"].split(":");
        jobsArray[jobHour]++;
    }
}

const dayTimeSpent = (jobsArray, jobs) => {
    for (let job in jobs) {
        let [jobHour, jobMinute] = jobs[job]["time received"].split(":");
        let [durationHour, durationMinute, durationSecond] = jobs[job]["time spent"].split(":");
        jobsArray[jobHour] += parseInt(durationMinute);
    }
}

const dayDuration = (jobsArray, jobs) => {
    for (let job in jobs) {
        let [jobHour, jobMinute] = jobs[job]["time received"].split(":");
        let [durationHour, durationMinute, durationSecond] = jobs[job]["duration"].split(":");
        jobsArray[jobHour] += parseInt(durationMinute);
    }
}

const dayAvgAccuracy = (jobsArray, jobs) => {
    let countOfJobsInEachHour = [...jobsArray];
    for (let job in jobs) {
        let [jobHour, jobMinute] = jobs[job]["time received"].split(":");
        let jobAccuracy = jobs[job]["accuracy"];
        jobsArray[jobHour] += jobAccuracy;
        countOfJobsInEachHour[jobHour]++;
    }
    // average all the jobs' accuracies that have more than one job in an hour
    for (let i = 0; i < 24; i++) {
        if (countOfJobsInEachHour[i] > 1) {
            jobsArray[i] /= countOfJobsInEachHour[i];
        }
    }
}

const dayMoneyEarned = (jobsArray, jobs) => {
    for (let job in jobs) {
        let [jobHour, jobMinute] = jobs[job]["time received"].split(":");
        let jobPay = jobs[job]["pay"]
        jobsArray[jobHour] += parseFloat(jobPay);

    }
}

const monthJobsReceived = (jobsArray, jobs) => {
    for (let job in jobs) {
        let dayIndex = (jobs[job]["day"]) - 1;
        jobsArray[dayIndex]++;
    }
}
const monthTimeSpent = (jobsArray, jobs) => {
    for (let job in jobs) {
        let dayIndex = (jobs[job]["day"]) - 1;
        let [dayDurationHours, dayDurationMinutes, dayDurationSeconds] = jobs[job]["time spent"].split(":");
        jobsArray[dayIndex] += parseInt(dayDurationMinutes);
    }
}

const monthDuration = (jobsArray, jobs) => {
    for (let job in jobs) {
        let dayIndex = (jobs[job]["day"]) - 1;
        let [dayDurationHours, dayDurationMinutes, dayDurationSeconds] = jobs[job]["duration"].split(":");
        jobsArray[dayIndex] += parseInt(dayDurationMinutes);
    }
}

const monthAvgAccuracy = (jobsArray, jobs) => {
    let countOfJobsPerDayArray = [...jobsArray];
    for (let job in jobs) {
        let dayIndex = (jobs[job]["day"]) - 1;
        let dayAccuracy = jobs[job]["accuracy"];
        jobsArray[dayIndex] += dayAccuracy;
        countOfJobsPerDayArray[dayIndex]++;
    }

    for (let i = 0; i < jobsArray.length; i++) {
        if (countOfJobsPerDayArray[i] > 1) {
            jobsArray[i] /= countOfJobsPerDayArray[i];
        }
    }
}
const monthMoneyEarned = (jobsArray, jobs) => {
    for (let job in jobs) {
        let dayIndex = (jobs[job]["day"]) - 1;
        let dayPay = parseFloat(jobs[job]["pay"])
        jobsArray[dayIndex] += dayPay;
    }
}
const yearJobsReceived = (jobsArray, jobs) => {
    for (let month in jobs) {
        let indexOfMonth = months.findIndex(index => index === month);
        for (let job in jobs[month]) {
            jobsArray[indexOfMonth] += 1;
        }
    }
}

const yearTimeSpent = (jobsArray, jobs) => {
    for (let month in jobs) {
        let indexOfMonth = months.findIndex(index => index === month);
        let timeSpent = 0;
        for (let job in jobs[month]) {
            let jobTimeSpent = jobs[month][job]["time spent"];
            let minutes = (jobTimeSpent.split(":"))[1];
            timeSpent += parseInt(minutes);
        }
        jobsArray[indexOfMonth] = timeSpent;
    }
}

const yearAvgAccuracy = (jobsArray, jobs) => {
    for (let month in jobs) {
        let indexOfMonth = months.findIndex(index => index === month);
        let accuracyCount = [];
        // array to hold amount of accuracy values
        for (let i = 0; i < 12; i++) {
            accuracyCount.push(0);
        }

        for (let job in jobs[month]) {
            let avgAccuracy = jobs[month][job]["accuracy"];
            jobsArray[indexOfMonth] += parseFloat(avgAccuracy);
            accuracyCount[indexOfMonth]++;
        }
        // average the accuracies
        for (let i = 0; i < 12; i++) {
            if (accuracyCount[i] > 1) {
                jobsArray[i] /= accuracyCount[i];
            }
        }
    }
}

const yearMoneyEarned = (jobsArray, jobs) => {
    for (let month in jobs) {
        let indexOfMonth = months.findIndex(index => index === month);
        for (let job in jobs[month]) {
            let pay = jobs[month][job]["pay"];
            jobsArray[indexOfMonth] += parseFloat(pay);
        }
    }
}

export const prepareAllExtraInfo = (jobData, currentDateAsObject) => {
    if (jobData != null) {

        let dayJobs = getAllJobsForSelectedDay(jobData, currentDateAsObject);
        let dayTimeSpentArray = [];
        let dayDurationArray = [];
        let dayMoneyEarnedArray = [];
        fillArrayForDaysRange(dayTimeSpentArray);
        fillArrayForDaysRange(dayDurationArray);
        fillArrayForDaysRange(dayMoneyEarnedArray);
        dayTimeSpent(dayTimeSpentArray, dayJobs);
        dayDuration(dayDurationArray, dayJobs);
        dayMoneyEarned(dayMoneyEarnedArray, dayJobs);
        let dayTotalTimeSpent = dayTimeSpentArray.reduce((prev, cur) => prev + cur);
        let dayTotalDuration = dayDurationArray.reduce((prev, cur) => prev + cur);
        let dayTotalMoneyEarned = dayMoneyEarnedArray.reduce((prev, cur) => prev + cur);

        let monthJobs = getAllJobsForSelectedMonth(jobData, currentDateAsObject);
        let monthTimeSpentArray = [];
        let monthDurationArray = [];
        let monthMoneyEarnedArray = [];
        fillArrayForMonthRange(monthTimeSpentArray, currentDateAsObject);
        fillArrayForMonthRange(monthDurationArray, currentDateAsObject);
        fillArrayForMonthRange(monthMoneyEarnedArray, currentDateAsObject);
        let monthJobsCount = 0;
        for (let job in monthJobs) {
            monthJobsCount++;
        }
        monthTimeSpent(monthTimeSpentArray, monthJobs );
        monthDuration(monthDurationArray, monthJobs);
        monthMoneyEarned(monthMoneyEarnedArray, monthJobs);
        let monthTotalTimeSpent = monthTimeSpentArray.reduce((prev, cur) => prev + cur);
        let monthTotalDuration = monthDurationArray.reduce((prev, cur) => prev + cur);
        let monthTotalMoneyEarned = monthMoneyEarnedArray.reduce((prev, cur) => prev + cur);

        return {
            dayJobsCount: dayJobs ? dayJobs.length : 0,
            dayTimeSpent: dayTotalTimeSpent,
            dayDuration: dayTotalDuration,
            dayMoneyEarned: dayTotalMoneyEarned,
            monthJobsCount: monthJobsCount,
            monthTimeSpent: monthTotalTimeSpent,
            monthDuration: monthTotalDuration,
            monthMoneyEarned: monthTotalMoneyEarned
        }
    }

}



