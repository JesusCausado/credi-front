import axios from "axios";
var token = localStorage.getItem('myToken');
axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

const client = (method, data, route) => new axios({
    method: method,
    url: 'http://localhost:4000/'+route,
    data: data
})

export default client;