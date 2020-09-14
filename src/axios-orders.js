import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reactburgercourse.firebaseio.com/'
})

export default instance;