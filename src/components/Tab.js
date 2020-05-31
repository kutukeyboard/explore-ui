import React, { useState, useEffect, createContext, useContext } from "react";

const TabContext = createContext();

const Item = (props) => {
  const [tabItems, setTabItems] = useContext(TabContext);

  return (
    <div className="exTabItem">
      {props.id == tabItems ? props.children : null}
    </div>
  );
};

const Tab = (props) => {
  const [tabData, setTabData] = useState(props.activeTab);

  return (
    <TabContext.Provider value={[tabData, setTabData]}>
      <div className="exTab">
        <div className="exTabSwitch">
          {props.children.map((child, i) => {
            return (
              <div
                id={child.props.id}
                key={i}
                className={
                  child.props.id == tabData
                    ? "exTabButton active"
                    : "exTabButton"
                }
                onClick={(e) => setTabData(e.target.id)}
              >
                {child.props.tab}
              </div>
            );
          })}
        </div>
        <div className="exTabContent">{props.children}</div>
      </div>
    </TabContext.Provider>
  );
};

Tab.Item = Item;
export default Tab;
