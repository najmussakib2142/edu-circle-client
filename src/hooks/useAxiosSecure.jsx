import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';


const axiosInstance = axios.create({
    baseURL: 'https://edu-circle-server-seven.vercel.app'
})

const useAxiosSecure = () => {

    const { user } = useAuth();

    axiosInstance.interceptors.request.use(config => {
        config.headers.authorization = `Bearer ${user.accessTOken}`
        return config;
    })

    return axiosInstance
};

export default useAxiosSecure;