import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3006';
export function getProjects() {
  return axios.get('/login.json', {
    headers: {
      'X-Redmine-API-Key': '2fda745bb4cdd835fdf41ec1fab82a13ddc1a54c'
    }
  });
}

class API {
  static postLogin(data) {
    return axios({
      method: 'post',
      url: '/login',
      data: {
        user: data
      }
    });
  }
  static createUser(data) {
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
  static getUser(data) {
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
  static postRoutes(data, headers) {
    return axios({
      method: 'post',
      url: '/walks',
      headers,
      data: {
        walk: data
      }
    }).catch(error => {
      console.dir(error);
    });
  }
  static getRoutes(headers) {
    return axios({
      method: 'get',
      url: '/walks',
      headers

    }).catch(error => {
      console.dir(error);
    });
  }
}

export default API;
