import axios, { AxiosRequestConfig } from "axios";
import router from "../router";
import { getStore } from './storage';

const service = axios.create({
  // 请求接口时默认作为 API 前缀
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 10000,
  headers: { 'Content-type': 'application/json; chartset=utf-8' }
});

// Loading 对象
// let loading: any;

//请求拦截器
service.interceptors.request.use((config:
  AxiosRequestConfig<any>) => {
  // 请求之前设置token
  const token = getStore('token');
  if (token === null || token === '') {
    router.push('/login')
  }
  return config
});
//相应拦截器
service.interceptors.request.use((config:
  AxiosRequestConfig<any>) => {
  return config
})
export default service