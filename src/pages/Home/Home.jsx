import React, { Suspense } from 'react';
import Banner from './Banner';
import Assignments from './Assignments';
import Loading from '../shared/Loading';
import CountSection from '../shared/CountSection';
import FeatureSection from '../FeatureSection/FeatureSection';
import FAQSection from '../FAQSection/FAQSection';
import TestimonialsSection from '../TestimonialsSection/TestimonialsSection';
import NewsletterSection from './NewsletterSection/NewsletterSection';
import HowItWorksSection from '../HowItWorksSection/HowItWorksSection';
// import { Helmet } from 'react-helmet-async';

const Home = () => {

    const API_URL = import.meta.env.VITE_REACT_APP_API_URL || import.meta.env.VITE_REACT_APP_LIVE_API_URL;
    const assignmentsPromise = fetch(`${API_URL}/assignments/home`).then(res => res.json());

    // const assignmentsPromise = fetch('https://edu-circle-server-seven.vercel.app/assignments')
    //     .then(res => res.json())
    return (
        <div className=''>
            {/* <Helmet>
                <title>EduCircle || Home</title>
            </Helmet> */}

            <Banner></Banner>
            <HowItWorksSection></HowItWorksSection>
            <Suspense fallback={<Loading></Loading>}>
                <Assignments assignmentsPromise={assignmentsPromise}></Assignments>
            </Suspense>
            <FeatureSection></FeatureSection>
            <TestimonialsSection></TestimonialsSection>
            <CountSection></CountSection>
            <FAQSection></FAQSection>
            {/* <NewsletterSection></NewsletterSection> */}
        </div>
    );
};

export default Home;