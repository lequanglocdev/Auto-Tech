import React from 'react';
import './Home.module.css';
import CareServices from '@/components/UI/CareServices/CareServices';
import { Specification, Banner,Intro,Services,Sidebar,Staff, FeedBack} from '@/components/UI/Home';
const Home = () => {
    return (
        <div className="home">
            <Sidebar />
            <Intro />
            <Services/>
            <Banner/>
            <CareServices/>
            <Specification/>
            <Staff/>
            <FeedBack/>
        </div>
    );
};

export default Home;
