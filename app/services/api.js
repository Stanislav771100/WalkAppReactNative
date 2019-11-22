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
  static getUser(headers, params) {
    return axios('/users', {
      method: 'get',
      headers,
      params
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
  static updateUser(user, id, headers) {
    return axios(`/users/${id}`, {
      method: 'put',
      headers,
      data: { user }
    });
  }
  static getRoutesUser(headers, id) {
    return axios({
      method: 'get',
      url: '/walks',
      headers,
      params: {
        filter: id || {}
      }
    }).catch(error => {
      console.dir(error);
    });
  }
  static delete(data, headers) {
    return axios({
      method: 'delete',
      url: '/walks',

      data: {
        walk: data
      },
      headers
    });
  }
}

export default API;
