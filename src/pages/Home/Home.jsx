import React from 'react';
import './Home.module.css';
import CareServices from '@/components/UI/CareServices/CareServices';
import { Specification, Banner, Contact, Services, Sidebar, Staff, FeedBack, Intro,ScrollTop } from '@/components/UI/Home';
import Blogs from '@/components/UI/Blogs/Blogs';
import Footer from '@/components/Layout/DefaultLayout/Footer/Footer';
const Home = () => {
    return (
        <div id='home'>
            <Sidebar />
            <Contact />
            <Services />
            <Banner />
            <CareServices />
            <Specification />
            <Staff />
            <FeedBack />
            <Intro/>
            <Blogs/>
            <Footer/>
            <ScrollTop/>
        </div>
    );
};

export default Home;
