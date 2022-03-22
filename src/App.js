import classes from "./classes.module.css";
import { useState } from "react";
import TabButton from "./components/tabs/TabButton";
import Calendar from "./components/calendar/Calendar";
import CalendarHamburger from "./components/calendar/CalendarHamburger";
import CSVReader from "react-csv-reader";
import BarChart from "./components/charts/BarChart";



function App() {

  const [jobsData, setJobsData] = useState(false);

  return (
    <div className={classes.mainContainer}>
      <CalendarHamburger />

      <CSVReader
        parserOptions={{
          header: true,
          skipEmptyLines: "greedy"
        }}
        onFileLoaded={(data) => setJobsData(data)} />

        <BarChart jobsData={jobsData}/>


      {/* <div className={classes.tabsMainContainer}>
        <TabButton
          handleOnClick={tabSelectHandler}
          id={"day"}
          label="by day"
          isSelected={selectedTab["day"]}
        />
        <TabButton
          handleOnClick={tabSelectHandler}
          id={"week"}
          label="by week"
          isSelected={selectedTab["week"]}
        />
        <TabButton
          handleOnClick={tabSelectHandler}
          id={"month"}
          label="by month"
          isSelected={selectedTab["month"]}
        />
        <TabButton
          handleOnClick={tabSelectHandler}
          id={"year"}
          label="by year"
          isSelected={selectedTab["year"]}
        />
      </div> */}
    </div>
  );
}

export default App;
