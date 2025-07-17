export const mySubmissionsPromise = (email, accessToken) => {
    return fetch(`http://localhost:5000/submissions?email=${email}`, {
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    })
        .then(res => res.json())
}
