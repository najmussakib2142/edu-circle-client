import React, { useState } from 'react';
import { auth } from '../firebase/firebase.init';

const waitForUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe();
            if (user) {
                resolve(user);
            } else {
                reject(new Response('Unauthorized', { status: 401 }));
            }
        });
    });
};

const assignmentLoader = async ({ params }) => {

    const user = await waitForUser();
    const token = await user.getIdToken();

    const res = await fetch(`https://edu-circle-server-seven.vercel.app/assignments/${params.id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        throw new Response('Failed to load assignment', { status: res.status });
    }

    return res.json();
};

export default assignmentLoader;