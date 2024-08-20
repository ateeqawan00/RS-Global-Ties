import axios from 'axios';


//new commits
const instance = axios.create({
  baseURL: 'http://localhost:3000/api'
});
//new changes
export default instance;


// https://backend.rsglobalties.com/api
// http://localhost:3000/api