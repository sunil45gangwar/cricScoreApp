import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://cricapi.com/api'
});

export default instance;