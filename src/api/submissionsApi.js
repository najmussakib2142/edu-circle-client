export const mySubmissionsPromise = email => {
    return fetch(`http://localhost:5000/submissions?email=${email}`)
        .then(res => res.json())
}
