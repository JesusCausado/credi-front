import axios from "axios";

const client = (method, data, route) => new axios({
    method: method,
    url: 'http://localhost:4000/'+route,
    data: data
});

export default client;