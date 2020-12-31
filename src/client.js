import axios from "axios";
/*var token = localStorage.getItem('myToken');
if (!token) {
    //token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5vcmUxIiwiaWF0IjoxNjAzNTY1OTEwLCJleHAiOjE2MDUyOTM5MTB9.wIVdM9t2eCoGtQ4XOdedrAtJYssFjqDnJ1kpglseycs";
    token = "1";
}*/
//const source = axios.CancelToken.source();
const client = (method, data, route) => new axios({
    method: method,
    url: 'http://localhost:4000/' + route,
    data: data,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('myToken')}`
    },
    //cancelToken: source.token
});
//source.cancel();

export default client;