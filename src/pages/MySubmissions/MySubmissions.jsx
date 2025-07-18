import React, { Suspense } from 'react';
import SubmissionsList from './SubmissionsList';
import Loading from '../shared/Loading';
import useAuth from '../../hooks/useAuth';
import { mySubmissionsPromise } from '../../api/submissionsApi';


const MySubmissions = () => {

    const { user } = useAuth()

    return (
        <div>
            <Suspense fallback={<Loading></Loading>}>
                <SubmissionsList
                    mySubmissionsPromise={mySubmissionsPromise(user.email, user.accessToken)}
                >
                </SubmissionsList>
            </Suspense>
        </div>
    );
};

export default MySubmissions;