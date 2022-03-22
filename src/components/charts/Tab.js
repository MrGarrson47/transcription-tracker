import classes from "./Tab.module.css";


const Tab = (props) => {

    const {id, onClick, isActive, gridClass} = props;

    let tabStyle = isActive ? [gridClass, classes.tabContainerActive].join(" ") : [gridClass, classes.tabContainerPassive].join(" ");
    let tabTextStyle = isActive ? classes.tabTextActive : classes.tabTextPassive;

    return (
        <div
            onClick={onClick}
            id={id}
            className={tabStyle}
        >
            <p className={tabTextStyle}>{id}</p>
        </div>
    )
}

export default Tab;