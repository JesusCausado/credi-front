import axios from "axios";
var token = localStorage.getItem('myToken');
if (!token) {
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5vcmUxIiwiaWF0IjoxNTk5OTU5ODA2LCJleHAiOjE2MDAwNDYyMDZ9.8eEBkHHW2Zo6p7oj7htMf7typQDuih9aCVTmqcsPY48";
}
axios.defaults.headers.common = {'authorization': `Bearer ${token}`}

const client = (method, data, route) => new axios({
    method: method,
    url: 'http://localhost:4000/' + route,
    data: data
})

export default client;