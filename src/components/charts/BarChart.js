import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { dateObjectFromString } from '../../generalDateFunctions';
import classes from "./BarChart.module.css"
import { useState, useEffect } from 'react';
import Tab from './Tab';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";
import TabsContainer from './TabsContainer';

const firebaseConfig = {
    apiKey: "AIzaSyDZtwc1-uknDuGCvIenRXPOOdNyGCeoN_M",
    authDomain: "transcriptiontracker.firebaseapp.com",
    databaseURL: "https://transcriptiontracker-default-rtdb.firebaseio.com",
    projectId: "transcriptiontracker",
    storageBucket: "transcriptiontracker.appspot.com",
    messagingSenderId: "87847571379",
    appId: "1:87847571379:web:72e88ea08c14db0f0945c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const hourLabels = ["00:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00", "05:00-06:00", "06:00-07:00", "07:00-08:00", "08:00-09:00", "09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00", "20:00-21:00", "21:00-22:00", "22:00-23:00", "23:00-00:00"];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


const BarChart = (props) => {
    const { jobsData } = props;
    const currentDateAsObject = dateObjectFromString(useSelector(state => state.selectedDate));
    const selectedYear = useSelector(state => state.selectedYear);
    const selectedDay = useSelector(state => state.selectedDay);

    const [selectByCategoryTab, setSelectByCategoryTab] = useState({
        "Jobs Received": true,
        "Time Spent": false,
        "Avg Accuracy": false,
        "Money Earned": false
    });

    const [selectByDateTab, setSelectByDateTab] = useState({
        day: true,
        month: false,
        year: false
    });

    const [jobData, setJobData] = useState({});

    const readTest = (year) => {
        let dbRef = ref(db);
        get(child(dbRef, `${year}/`)).then(snapshot => {
            if (snapshot.exists()) {
                setJobData(snapshot.val());
            }
            else {
                console.log("no data");
                setJobData({})
            }
        })
    }

    useEffect(() => {
        readTest(currentDateAsObject.getFullYear())
    }, [currentDateAsObject.getFullYear()])


    const dateTabHandler = (e) => {
        const { id } = e.target;
        let currentTabsSelected = { ...selectByDateTab };
        for (let key in currentTabsSelected) {
            currentTabsSelected[key] = false;
        }
        currentTabsSelected[id] = true;
        setSelectByDateTab(currentTabsSelected);
    }


    const categoryTabHandler = (e) => {
        const { id } = e.target;
        let currentTabsSelected = { ...selectByCategoryTab };
        for (let key in currentTabsSelected) {
            currentTabsSelected[key] = false;
        }
        currentTabsSelected[id] = true;
        setSelectByCategoryTab(currentTabsSelected);
    }

    const filterByDay = () => {
        if (jobData != null) {
            let jobs = [];

            let jobsInMonth = jobData[months[currentDateAsObject.getMonth()]];
            for (let job in jobsInMonth) {
                if (parseInt(jobsInMonth[job]["day"]) === parseInt(selectedDay)) {
                    jobs.push(jobsInMonth[job]);
                }
            }
            return jobs;
        }
        return {};
    }

    const filterByMonth = () => {
        if (jobData != null) {
            let jobs = jobData.filter(job => {
                let jobDateAsObject = dateObjectFromString(job["Date Submitted"]);
                return jobDateAsObject.getMonth() === currentDateAsObject.getMonth();
            })
            return jobs;
        }
        return {};
    }

    const filteredJobsByDate = () => {
        if (selectByDateTab["day"]) {
            return filterByDay();
        }
        if (selectByDateTab["month"]) {
            return filterByMonth();
        }
        if (selectByDateTab["year"]) {
            return jobData;
        }
    }

    const filteredJobsByCategory = (jobs) => {
        let jobsArray = [];
        // dateRange is day, need to have an array of length 24, 1 for each hour in a day, increase index of hour if a job occurred in that hour
        if (selectByDateTab["day"]) {
            // fill array with 24 zeroes
            for (let i = 0; i < 24; i++) {
                jobsArray.push(0);
            }
            // jobs received tab
            if (selectByCategoryTab["Jobs Received"]) {
                for (let job in jobs) {
                    let [jobHour, jobMinute] = jobs[job]["time received"].split(":");
                    jobsArray[jobHour]++;
                }
            }
            // time spent
            if (selectByCategoryTab["Time Spent"]) {
                for (let job in jobs) {
                    let [jobHour, jobMinute] = jobs[job]["time received"].split(":");
                    let [durationHour, durationMinute, durationSecond] = jobs[job]["time spent"].split(":");
                    jobsArray[jobHour] += parseInt(durationMinute);
                }
            }
            // avg accuracy
            if (selectByCategoryTab["Avg Accuracy"]) {
                let countOfJobsInEachHour = [...jobsArray];
                for (let job in jobs) {
                    let [jobHour, jobMinute] = jobs[job]["time received"].split(":");
                    let jobAccuracy = jobs[job]["accuracy"];
                    jobsArray[jobHour] += jobAccuracy;
                    countOfJobsInEachHour[jobHour]++;
                }
                // average out all the jobs' accuracies that have more than one job in an hour
                for (let i = 0; i < 24; i++) {
                    if (countOfJobsInEachHour[i] > 1) {
                        jobsArray[i] /= countOfJobsInEachHour[i];
                    }
                }
            }
            // money earned
            if (selectByCategoryTab["Money Earned"]) {
                for (let job in jobs) {
                    let [jobHour, jobMinute] = jobs[job]["time received"].split(":");
                    let jobPay = jobs[job]["pay"]
                    jobsArray[jobHour] += parseFloat(jobPay);

                }
            }


        }
        return jobsArray;
    }

    const newGetChartData = () => {
        let chartData;
        //get the fetched job data filtered by day, month, or year
        let filteredData = filteredJobsByDate();
        //use the above to return an object of graph data, by jobs received, time spent, avg accuracy, or money earned
        let filteredDataByCategory = filteredJobsByCategory(filteredData);

        if (selectByDateTab["day"] && selectByCategoryTab["Jobs Received"]) {
            chartData = {
                labels: hourLabels,
                datasets: [
                    {
                        label: "Amount Of Jobs",
                        backgroundColor: "green",
                        borderWidth: 2,
                        data: filteredDataByCategory
                    }
                ]
            }
        }

        if (selectByDateTab["day"] && selectByCategoryTab["Time Spent"]) {
            chartData = {
                labels: hourLabels,
                datasets: [
                    {
                        label: "Time Spent",
                        backgroundColor: "yellow",
                        borderWidth: 2,
                        data: filteredDataByCategory
                    }
                ]
            }
        }

        if (selectByDateTab["day"] && selectByCategoryTab["Avg Accuracy"]) {
            chartData = {
                labels: hourLabels,
                datasets: [
                    {
                        label: "Avg Accuracy",
                        backgroundColor: "red",
                        borderWidth: 2,
                        data: filteredDataByCategory
                    }
                ]
            }
        }

        if (selectByDateTab["day"] && selectByCategoryTab["Money Earned"]) {
            chartData = {
                labels: hourLabels,
                datasets: [
                    {
                        label: "Pay Earned",
                        backgroundColor: "blue",
                        borderWidth: 2,
                        data: filteredDataByCategory
                    }
                ]
            }
        }
        return chartData;
    }



    return (
        <>
            <div className={classes.mainContainer}>
                <div className={classes.dateTabsContainer}>
                    <div></div>
                    <TabsContainer
                        tabIds={["day", "month", "year"]}
                        clickHandler={dateTabHandler}
                        isActive={selectByDateTab}
                    />
                </div>
                <div className={classes.categoriesAndChartContainers}>
                    <div className={classes.categoryTabsContainer}>
                        <TabsContainer
                            tabIds={["Jobs Received", "Time Spent", "Avg Accuracy", "Money Earned"]}
                            clickHandler={categoryTabHandler}
                            isActive={selectByCategoryTab}
                        />
                    </div>
                    <div className={classes.chartContainer}>
                        <Bar
                            data={newGetChartData()}
                            options={{
                                title: {
                                    display: true,
                                    text: 'Test',
                                    fontSize: 20
                                },
                                legend: {
                                    display: true,
                                    position: "right"
                                }
                            }}
                        />
                    </div>
                </div>


            </div>

        </>
    )
}

export default BarChart;