import classes from "./TabButton.module.css";

const TabButton = (props) => {

    const { label, handleOnClick, id, isSelected } = props;

    const underLineStyle = isSelected ? classes.tabUnderlineActive : classes.tabUnderlinePassive;
    const tabButtonStyle = isSelected ? classes.tabActive : classes.tabPassive;

    return (
        <div className={classes.tabContainer}>
            <button
                id={id}
                onClick={handleOnClick}
                className={tabButtonStyle}>
                {label}
            </button>
            <div
                className={underLineStyle}>
            </div>
        </div>
    )
}

export default TabButton;