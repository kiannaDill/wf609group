// 封装拦截器，再调用 API 的时候出发

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import { AxiosResponseEx } from "../model/params";
import router from "../router";
import { errorCodeType } from "./error-code-type";
import { getStore } from './storage';

const service = axios.create({
  // 请求接口时默认作为 API 前缀
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
  headers: { 'Content-type': 'application/json; chartset=utf-8' }
});

// Loading 对象
// let loading: any;

//请求拦截器
service.interceptors.request.use((
  // 再请求发送前做的操作
  // axios 请求配置
  // config 将要做请求的设置
  config: AxiosRequestConfig<any>) => {
  // 请求之前设置token
  const token = getStore('token');
  if (token === null || token === '') {
    // 未登录，跳转登陆页面
    router.push('/login')
  }

  if (config.headers != null) {
    // 需要设置 token
    config.headers['Authorization'] = 'Bearer' + token;
  }

  // GET 请求转换参数
  if (config.method?.toUpperCase() === 'GET' && config.params) {
    let url = config.url + '?';
    for (const propName of Object.keys(config.params)) {
      // 获取当前属性的值
      const value = config.params[propName];
      // encodeURIComponent 把浏览器不识别的转换为识别的
      var part = encodeURIComponent(propName) + '=';
      // 处理值部分
      if (value !== null && typeof value !== 'undefined') {
        // 如果参数的值是对象的形式，需要做特殊处理
        if (typeof value === 'object') {
          // 遍历参数对象
          for (const key of Object.keys(value)) {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + '=';
            url += encodeURIComponent(value[key]) + '&';
          }
        } else {
          url += part + encodeURIComponent(value) + '&'
        }
      }
    }
    // 去掉尾部 & 符号
    url = url.slice(0, -1);
    // 已经将参数转换到 URL 路径中
    config.params = {};
    // 将拼接好的URL赋值到请求 config.url 中
    config.url = url;
  }
  return config
}, (error) => {
  Promise.reject(error);
});

//响应拦截器
service.interceptors.response.use(
  // 返回已知错误
  (res) => {
    // closeLoading
    // 未设置状态码，默认成功
    const code = res.status;
    // 获取错误信息
    const msg = res.data['message'] || errorCodeType(code.toString()) || res.data['msg'] || errorCodeType('default');
    if (code === 200) {
      // 所有条件都符合正常返回数据
      return Promise.resolve(res.data as AxiosResponseEx);
    } else if (code === 401) {
      // 未授权
      ElMessage.error('需要登陆');
      return Promise.reject(res.data);
    } else {
      ElMessage.error(msg);
      return Promise.reject(res.data);
    }
  },
  // 错误处理
  // 返回未知错误
  (error) => {
    let { message } = error;
    if (message === 'Network Error') {
      message = '网络似乎遇到了问题，请检查网络连接状况'
    } else if (message.includes('timeout')) {
      return Promise.reject(error);
    } else if (message.includes('401')) {
      return Promise.reject(error)
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    ElMessage.error({ message, duration: 5 * 1000 });
    return Promise.reject(error);
  }
)
export default service