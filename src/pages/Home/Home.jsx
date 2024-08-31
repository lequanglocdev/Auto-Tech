import React from 'react';
import './Home.css';
import Sidebar from '@/components/UI/Sidebar/Sidebar';
import Intro from '@/components/UI/Intro/Intro';
import Services from '@/components/UI/Services/Services';
import Banner from '@/components/UI/Banner/Banner';
import CareServices from '@/components/UI/CareServices/CareServices';
const Home = () => {
    return (
        <div className="home">
            <Sidebar />
            <Intro />
            <Services/>
            <Banner/>
            <CareServices/>
        </div>
    );
};

export default Home;
