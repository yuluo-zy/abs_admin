import axios from "axios";
import { Notification } from "@arco-design/web-react";

axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "/api" : "/api";
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.timeout = 100000;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  token && (config.headers["Access-Token"] = `${token}`);
  // config.data = JSON.stringify(config.data);
  return config;
}, (error) => {
  Notification.error({ title: "Error", content: "system error!" });
  Promise.reject(error);
});
axios.defaults.transformRequest = [function(data, config) {
  switch (config["Content-Type"].toLowerCase()) {
    case "application/json;charset=utf-8": {
      return JSON.stringify(data);
    }
    case "multipart/form-data;charset=utf-8": {
      return data;
    }
    default: {
      return JSON.stringify(data);
    }
  }
}];

axios.interceptors.response.use(res => {
  if (res.status && res.status == 200 && res.data.success === false) {
    Notification.error({ title: "Error", content: res.data.message });
    return;
  }
  return res;
}, err => {
  console.log(err);
  if (err.response?.status == 504 || err.response?.status == 404) {
    Notification.error({ content: "服务器被吃了⊙﹏⊙∥" });
  } else if (err.response?.status == 403) {
    Notification.error({ content: "权限不足,请联系管理员!" });
  } else if (err.response?.status == 401) {
    Notification.error({ content: "登录过期请 重新登录!" });
    localStorage.setItem("userToken", null);
    sessionStorage.setItem("userStatus", null);
    window.setTimeout(() => {
      window.location.href = "/login";
    }, 3000);

  } else {
    Notification.error({ content: "system error!" });
  }
  return Promise.reject(err);
});
const Axios = ({
                 method,
                 url,
                 data
               }) => {
  method = method.toLowerCase();
  if (method === "post") {
    return axios.post(url, data);
  }

  if (method === "get") {
    return axios.get(url, {
      params: data
    });
  }

  if (method === "delete") {
    return axios.delete(url, { data });
  }

  if (method === "put") {
    return axios.put(url, data);
  }

  return axios.get(url, {
    params: data
  });

};

export default Axios;

export const getAxios = () => {
  return axios;
};
