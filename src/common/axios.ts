import axios from 'axios';
const http = axios.create({});
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.withCredentials = true;

http.interceptors.request.use(
  (config) => config,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response.status) {
      case 400:
        return error.response;
        break;
      case 404:
        alert('Not Found');
        break;
    }
    console.error(error);
    return Promise.reject(error);
  },
);

export default http;
