import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/api' : '/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 30000;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');
  // eslint-disable-next-line no-console
  console.log(token);
  token && (config.headers['Access-Token'] = `${token}`);
  config.data = JSON.stringify(config.data);
  return config;
}, (error) => {
  // 对请求错误做些什么
  Promise.reject(error);
});

axios.interceptors.response.use(res => {
  // eslint-disable-next-line no-console
  console.log(res);
  return res;
}, error => {
  // eslint-disable-next-line no-console
  console.log(error);
  return Promise.reject(error);
});
const Axios = ({
                 method,
                 url,
                 data
               }) => {
  method = method.toLowerCase();
  if (method === 'post') {
    return axios.post(url, data);
  }

  if (method === 'get') {
    return axios.get(url, {
      params: data
    });
  }

  if (method === 'delete') {
    return axios.delete(url, {
      params: data
    });
  }

  if (method === 'put') {
    return axios.put(url, data);
  }

  return axios.get(url, {
    params: data
  });

};
export default Axios;
