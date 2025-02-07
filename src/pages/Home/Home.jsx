import React from 'react';
import CareServices from '@/pages/CareServices/CareServices';
import { Specification, Banner, Contact, Services, SidebarHome, Staff, FeedBack } from '@/components/UI/Home';
import Blogs from '@/components/UI/Blogs/Blogs';
import Intro from '../Intro/Intro';

const Home = () => {
    
    return (
        <div>
            <SidebarHome />
            <Contact />
            <Services />
            <Banner />
            <CareServices />
            <Specification />
            <Staff />
            <FeedBack />
            <Intro/>
            <Blogs/>
        </div>
    );
};

export default Home;
