import axios from 'axios'; 

const instance = axios.create({
    baseURL: 'https://burger-builder-40c90.firebaseio.com/'
})

export default instance; 