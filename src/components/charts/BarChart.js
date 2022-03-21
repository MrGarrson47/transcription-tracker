import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { dateObjectFromString } from '../../generalDateFunctions';
import classes from "./BarChart.module.css"
import { useState } from 'react';
import Tab from './Tab';

const hourLabels = ["00:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00", "05:00-06:00", "06:00-07:00", "07:00-08:00", "08:00-09:00", "09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00", "20:00-21:00", "21:00-22:00", "22:00-23:00", "23:00-00:00"];


const BarChart = (props) => {
    const { jobsData } = props;
    const currentYear = dateObjectFromString(useSelector(state => state.currentYear));
    const selectedDay = useSelector(state => state.selectedDay);

    const [selectedTab, setSelectedTab] = useState({
        "Jobs Received": true,
        "Time Spent": false,
        "Avg Accuracy": false,
        "Money Earned": false
    });

    const tabSelectHandler = (e) => {
        const { id } = e.target;
        let currentTabsSelected = { ...selectedTab };
        for (let key in currentTabsSelected) {
            currentTabsSelected[key] = false;
        }
        currentTabsSelected[id] = true;
        setSelectedTab(currentTabsSelected);
    }

    const getJobsForSelectedDay = () => {
        let byDay = jobsData.filter(job => dateObjectFromString(job["Date Submitted"]).getDate() === parseInt(selectedDay))
        return byDay;
    }

    const getJobsByHour = () => {
        let byDay = getJobsForSelectedDay();
        let array = [];
        for (let i = 0; i < 24; i++) {
            array.push(0);
        }

        byDay.map(job => {
            let hourIndex = dateObjectFromString(job["Date Submitted"]).getHours();
            array[hourIndex]++;
        })

        return array;
    }

    const getJobsDuration = () => {
        let byDay = getJobsForSelectedDay();
        let array = [];
        for (let i = 0; i < 24; i++) {
            array.push(0);
        }
        byDay.forEach(job => {
            let dateObject = dateObjectFromString(job["Date Submitted"]);
            let hourIndex = dateObject.getHours();
            let time = job["Time Spent"]
            let [hours, minutes, seconds] = time.split(":");
            console.log(time)
            console.log(`Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`)
            array[hourIndex] += parseInt(minutes);
        })
        console.log(array)
        return array;
    }

    const amountOfJobsData = {
        labels: hourLabels,
        datasets: [
            {
                label: "Amount Of Jobs",
                backgroundColor: "green",
                borderWidth: 2,
                data: jobsData ? getJobsByHour() : hourLabels.map(item => Math.ceil(Math.random() * 10))
            }
        ]
    }

    const timeSpentData = {
        labels: hourLabels,
        datasets: [
            {
                label: "Time Spent",
                backgroundColor: "yellow",
                borderWidth: 2,
                data: jobsData ? getJobsDuration() : hourLabels.map(item=>Math.ceil(Math.random() *10))
            },
        ]
    }

    const getData = ()=>{
        return selectedTab["Jobs Received"] ? amountOfJobsData : selectedTab["Time Spent"] ? timeSpentData : amountOfJobsData;
    }


    return (
        <>
            <div className={classes.mainContainer}>
                <div className={classes.tabsContainer}>
                    <Tab
                        id={"Jobs Received"}
                        onClick={tabSelectHandler}
                        isActive={selectedTab["Jobs Received"]}
                    />
                    <Tab
                        id={"Time Spent"}
                        onClick={tabSelectHandler}
                        isActive={selectedTab["Time Spent"]}
                    />
                    <Tab
                        id={"Avg Accuracy"}
                        onClick={tabSelectHandler}
                        isActive={selectedTab["Avg Accuracy"]}
                    />
                    <Tab
                        id={"Money Earned"}
                        onClick={tabSelectHandler}
                        isActive={selectedTab["Money Earned"]}
                    />
                </div>
                <div className={classes.chartContainer}>
                    <Bar
                        data={getData()}
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

        </>
    )
}

export default BarChart;