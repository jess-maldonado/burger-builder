import axios from 'axios'; 

const instance = axios.create({
    baseURL: 'https://burger-builder-edc00.firebaseio.com/'
})

export default instance; 