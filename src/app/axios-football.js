import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://football-25167-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default instance;
