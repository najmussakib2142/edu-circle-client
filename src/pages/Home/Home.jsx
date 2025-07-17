import React, { Suspense } from 'react';
import Banner from './Banner';
import Assignments from './Assignments';
import Loading from '../shared/Loading';
import CountSection from '../shared/CountSection';
import FeatureSection from '../FeatureSection/FeatureSection';
import FAQSection from '../FAQSection/FAQSection';

const Home = () => {

    const assignmentsPromise = fetch('http://localhost:5000/assignments')
        .then(res => res.json())
    return (
        <div>
            <Banner></Banner>
            <Suspense fallback={<Loading></Loading>}>
                <Assignments assignmentsPromise={assignmentsPromise}></Assignments>
            </Suspense>
            <FeatureSection></FeatureSection>
            <FAQSection></FAQSection>
            <CountSection></CountSection>
        </div>
    );
};

export default Home;