import classes from "./classes.module.css";
import { useState } from "react";
import TabButton from "./components/tabs/TabButton";
import Calendar from "./components/calendar/Calendar";

function App() {

  const [selectedTab, setSelectedTab] = useState({
    day: true,
    week: false,
    month: false,
    year: false
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

  return (
    <div className={classes.mainContainer}>

      <Calendar />

      <div className={classes.tabsMainContainer}>
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
      </div>
    </div>
  );
}

export default App;
