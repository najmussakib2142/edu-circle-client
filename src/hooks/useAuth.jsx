import React, { use, useContext } from 'react';
import { AuthContext } from '../provider/AuthContext';

const useAuth = () => {
    const authInfo = useContext(AuthContext)
    return authInfo
};

export default useAuth;