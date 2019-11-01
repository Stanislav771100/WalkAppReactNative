import axios from 'axios';
axios.defaults.baseURL = 'http://10.0.4.20:3006';
export function getProjects() {
  return axios.get('/login.json', {
    headers: {
      'X-Redmine-API-Key': '2fda745bb4cdd835fdf41ec1fab82a13ddc1a54c'
    }
  });
}

class API {
  static postLogin(data) {
    console.log('ddf');
    return axios({
      method: 'post',
      url: '/login',
      data: {
        user: data
      }
    }).catch(error => {
      console.dir(error);
    });
  }
  static createUser(data) {
    console.log('ddf');
    return axios({
      method: 'post',
      url: '/users',
      data: {
        user: data
      }
    }).catch(error => {
      console.dir(error);
    });
  }
}
export default API;
