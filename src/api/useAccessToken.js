import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { getAuth } from 'firebase/auth';

const useAccessToken = () => {

    // const { user } = useAuth();
    const [accessToken, setAccessToken] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const token = await user.getIdToken();
                setAccessToken(token);
            } else {
                setAccessToken(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { accessToken, loading };
};

export default useAccessToken;