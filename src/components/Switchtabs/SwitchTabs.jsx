import React, { useRef, useState } from "react";

import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
    const [active, setActive] = useState(0);
    const [left, setLeft] = useState(0);
    const movingBg = useRef();
    const bgWidth = movingBg?.current?.offsetWidth;
    const activeTab = (tab, index, bgWidth) => {
        setLeft(index * bgWidth);
        setTimeout(() => {
            setActive(index);
        }, 300);
        onTabChange(tab, index);
    };

    return (
        <div className="switchingTabs">
            <div className="tabItems">
                {data.map((tab, index) => (
                    <span
                        key={index}
                        className={`tabItem ${
                            active === index ? "active" : ""
                        }`}
                        onClick={() => activeTab(tab, index, bgWidth)}
                    >
                        {tab}
                    </span>
                ))}
                <span className="movingBg" style={{ left }} ref={movingBg} />
            </div>
        </div>
    );
};

export default SwitchTabs;