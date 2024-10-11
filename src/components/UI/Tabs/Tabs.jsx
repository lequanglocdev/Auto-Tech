// Tabs.js
import React, { useState } from 'react';
import './Tabs.module.css'; // Import CSS file

const Tabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].eventKey); // Mặc định chọn tab đầu tiên

    const handleTabClick = (eventKey) => {
        setActiveTab(eventKey);
    };

    return (
        <div className="tabs">
            <ul className="tab-list">
                {tabs.map((tab) => (
                    <li
                        key={tab.eventKey}
                        className={`tab-item ${activeTab === tab.eventKey ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab.eventKey)}
                    >
                        {tab.title}
                    </li>
                ))}
            </ul>
            <div className="tab-content">
                {tabs.map((tab) => (
                    activeTab === tab.eventKey && (
                        <div key={tab.eventKey} className="tab-panel">
                            {tab.content}
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default Tabs;
