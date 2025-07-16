import React, { Suspense } from 'react';
import Banner from './Banner';
import Assignments from './Assignments';
import Loading from '../shared/Loading';
import CountSection from '../shared/CountSection';

const Home = () => {

    const assignmentsPromise = fetch('http://localhost:5000/assignments')
        .then(res => res.json())
    return (
        <div>
            <Banner></Banner>
            <Suspense fallback={<Loading></Loading>}>
                <Assignments assignmentsPromise={assignmentsPromise}></Assignments>
            </Suspense>
            <CountSection></CountSection>
        </div>
    );
};

export default Home;