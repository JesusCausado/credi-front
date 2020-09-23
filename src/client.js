import axios from "axios";
var token = localStorage.getItem('myToken');
if (!token) {
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5vcmUxIiwiaWF0IjoxNjAwMzk3NDE4LCJleHAiOjE2MDIxMjU0MTh9.1KssdKvar2VFbXeVhAWK94OavTUaL78Xpymb7_sJcuY";
}
axios.defaults.headers.common = {'authorization': `Bearer ${token}`}

const client = (method, data, route) => new axios({
    method: method,
    url: 'http://localhost:4000/' + route,
    data: data
})

export default client;