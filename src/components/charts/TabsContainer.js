import Tab from "./Tab";


const TabsContainer = (props) => {
    const { tabIds, clickHandler, isActive } = props;
    return (
        <>
            {tabIds.map(tabId => 
                <Tab
                    key={tabId}
                    id={tabId}
                    onClick={clickHandler}
                    isActive={isActive[tabId]}
                />
            )}
        </>
    )
}

export default TabsContainer;