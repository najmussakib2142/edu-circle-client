export const mySubmissionsPromise = (email, accessToken) => {
    return fetch(`https://edu-circle-server-seven.vercel.app/submissions?email=${email}`, {
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    })
        .then(res => res.json())
}
