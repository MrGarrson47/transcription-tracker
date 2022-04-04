import TabsContainer from '../charts/TabsContainer';
import classes from './ExtraInfo.module.css';
import { useState } from 'react';
import { prepareAllExtraInfo } from '../charts/jobFilteringFunctions';

const ExtraInfo = (props) => {

    const [selectByDateTab, setSelectByDateTab] = useState({
        day: true,
        month: false,
        year: false
    });

    const dateTabHandler = (e) => {
        const { id } = e.target;
        let currentTabsSelected = { ...selectByDateTab };
        for (let key in currentTabsSelected) {
            currentTabsSelected[key] = false;
        }
        currentTabsSelected[id] = true;
        setSelectByDateTab(currentTabsSelected);
    }

    const getExtraInfoForDay = ()=>{
        let {dayJobsCount, dayTimeSpent, dayDuration, dayMoneyEarned} = prepareAllExtraInfo(props.jobData, props.currentDateAsObject);
        return {
            jobsCount :dayJobsCount,
            timeSpent: `${Math.floor((dayTimeSpent /60))}hr ${dayTimeSpent % 60}min`,
            duration: `${Math.floor((dayDuration /60))}hr ${dayDuration % 60}min`,
            moneyEarned: `$${dayMoneyEarned.toFixed(2)}`,
            payRate: dayJobsCount > 0 ? `$${((dayMoneyEarned / dayTimeSpent) * 60).toFixed(2)}` : "$0.00"
        }
    }

    const getExtraInfoForMonth = ()=>{
        let {monthJobsCount, monthTimeSpent, monthDuration, monthMoneyEarned} = prepareAllExtraInfo(props.jobData, props.currentDateAsObject);
        return {
            jobsCount :monthJobsCount,
            timeSpent: `${Math.floor((monthTimeSpent /60))}hr ${monthTimeSpent % 60}min`,
            duration: `${Math.floor((monthDuration /60))}hr ${monthDuration % 60}min`,
            moneyEarned: `$${monthMoneyEarned.toFixed(2)}`,
            payRate: monthJobsCount > 0 ? `$${((monthMoneyEarned / monthTimeSpent) * 60).toFixed(2)}` : "$0.00"
        }
    }

    const useExtraInfo = ()=>{
        if(selectByDateTab["day"]){
            return getExtraInfoForDay();
        }
        if(selectByDateTab["month"]){
            return getExtraInfoForMonth();
        }
    }

    return (
        <>
            <div className={classes.extraInfoContainer}>
                <div className={classes.headingContainer}>
                    <p>Overview</p>
                </div>
                <div className={classes.tabsContainer}>
                    <TabsContainer
                        tabIds={["day", "month", "year"]}
                        clickHandler={dateTabHandler}
                        isActive={selectByDateTab}
                    />
                </div>

                <div className={classes.infoMainContainer}>
                    <div className={classes.infoContainer}>
                        <p className={classes.infoLabel}>total jobs received</p>
                        <div className={classes.infoValueContainer}>
                            <p className={classes.infoValue}>{useExtraInfo().jobsCount}</p>
                        </div>
                    </div>
                    <div className={classes.infoContainer}>
                        <p className={classes.infoLabel}>total time spent</p>
                        <div className={classes.infoValueContainer}>
                            <p className={classes.infoValue}>{useExtraInfo().timeSpent}</p>
                        </div>
                    </div>
                    <div className={classes.infoContainer}>
                        <p className={classes.infoLabel}>total duration of jobs</p>
                        <div className={classes.infoValueContainer}>
                            <p className={classes.infoValue}>{useExtraInfo().duration}</p>
                        </div>
                    </div>
                    <div className={classes.infoContainer}>
                        <p className={classes.infoLabel}>total money earned</p>
                        <div className={classes.infoValueContainer}>
                            <p className={classes.infoValue}>{useExtraInfo().moneyEarned}</p>
                        </div>
                    </div>
                    <div className={classes.infoContainer}>
                        <p className={classes.infoLabel}>pay per working hour</p>
                        <div className={classes.infoValueContainer}>
                            <p className={classes.infoValue}>{useExtraInfo().payRate}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExtraInfo;