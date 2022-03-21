import classes from "./Tab.module.css";


const Tab = (props) => {

    const {id, onClick, isActive} = props;

    let tabStyle = isActive ? classes.tabContainerActive : classes.tabContainerPassive;
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