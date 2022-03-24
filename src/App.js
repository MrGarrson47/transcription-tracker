import classes from "./classes.module.css";
import { useState } from "react";
import TabButton from "./components/tabs/TabButton";
import Calendar from "./components/calendar/Calendar";
import CalendarHamburger from "./components/calendar/CalendarHamburger";
import CSVReader from "react-csv-reader";
import BarChart from "./components/charts/BarChart";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { dateObjectFromString } from "./generalDateFunctions";

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

const writeJob = (year, month, id, data) => {
  set(ref(db, `${year}/${month}/${id}`), data)
}


function App() {

  const [jobsData, setJobsData] = useState(false);

  const uploadData = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    jobsData.forEach(item => {
      if (item["Type"] === "Job") {
        let itemDateAsObject = dateObjectFromString(item["Date Submitted"]);
        let itemYear = itemDateAsObject.getFullYear();
        let itemMonthAsIndex = itemDateAsObject.getMonth();
        let itemMonth = months[itemMonthAsIndex];
        let itemDay = itemDateAsObject.getDate();
        let itemReceivedHour = itemDateAsObject.getHours();
        let itemReceivedMinutes = itemDateAsObject.getMinutes();
        let itemTimeSpent = item["Time Spent"];
        let itemDuration = item["Duration/Units"]
        let itemID = item["ID"];
        let itemPay = item["Total"].slice(1);
        let itemAccuracy = item["Changed by QA, %"].slice(0, -1)
        
        let dataToUpload = {
          day: itemDay,
          month: itemMonthAsIndex,
          "time received": `${itemReceivedHour}:${itemReceivedMinutes}`,
          "time spent": itemTimeSpent,
          duration: itemDuration,
          pay: itemPay,
          rejected: false,
          accuracy: 100 - parseInt(itemAccuracy)
        }
        
        writeJob(itemYear, itemMonth, itemID, dataToUpload);
      }

    })
  }

  return (
    <div className={classes.mainContainer}>
      <CalendarHamburger />

      <CSVReader
        parserOptions={{
          header: true,
          skipEmptyLines: "greedy"
        }}
        onFileLoaded={(data) => setJobsData(data)} />

      <BarChart jobsData={jobsData} />

      <button onClick={uploadData}>upload data</button>

    </div>
  );
}

export default App;
