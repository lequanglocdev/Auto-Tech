import React, { useState } from 'react';
import styles from './Tabs.module.css';

const Tabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].eventKey); 
    const handleTabClick = (eventKey) => {
        setActiveTab(eventKey);
    };

    return (
        <div className={styles.tabs}>
            <ul className={styles.tabList}>
                {tabs.map((tab) => (
                    <li
                        key={tab.eventKey}
                        className={`${styles.tabItem} ${activeTab === tab.eventKey ? styles.active : ''}`}
                        onClick={() => handleTabClick(tab.eventKey)}
                    >
                        {tab.title}
                    </li>
                ))}
            </ul>
            <div className={styles.tabContent}>
                {tabs.map(
                    (tab) =>
                        activeTab === tab.eventKey && (
                            <div key={tab.eventKey} className={styles.tabPanel}>
                                {tab?.content}
                            </div>
                        ),
                )}
            </div>
        </div>
    );
};

export default Tabs;
