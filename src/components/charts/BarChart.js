import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { dateObjectFromString } from '../../generalDateFunctions';
import classes from "./BarChart.module.css"
import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";
import TabsContainer from './TabsContainer';
import ExtraInfo from '../extraInfo/ExtraInfo';
import { getChartData } from './jobFilteringFunctions';

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

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


const BarChart = (props) => {
    const currentDateAsObject = dateObjectFromString(useSelector(state => state.selectedDate));

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

    return (
        <div className={classes.mainContainer}>
            <div className={classes.chartMainContainer} >
                <div className={classes.dateTabsContainer}>
                    <div onClick={props.showCalendarHandler} className={classes.dateHamburgerContainer}>
                        <p>{`${currentDateAsObject.getDate()} of ${months[currentDateAsObject.getMonth()]}`}</p>
                        <p>{currentDateAsObject.getFullYear()}</p>
                    </div>
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
                            data={getChartData(selectByDateTab, selectByCategoryTab, jobData, currentDateAsObject)}
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
            <ExtraInfo jobData={jobData} currentDateAsObject={currentDateAsObject} />
        </div>
    )
}

export default BarChart;