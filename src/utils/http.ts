// 本页封装的是方法
import { AxiosResponseEx } from "../model/params";
import service from "./request";

// GET 请求封装
const getAction = async (url: string, params: object): Promise<AxiosResponseEx> => {
  return (await service({ url, method: 'GET', params, })) as unknown as AxiosResponseEx;
}

// POST 请求封装
const postAction = async (url: string, data: object, params?: object): Promise<AxiosResponseEx> => {
  return (await service({ url, method: 'POST', params, data, })) as unknown as AxiosResponseEx
}

// 删除封装
const delAction = async (url: string, params: object): Promise<AxiosResponseEx> => {
  return (await service({ url, method: 'DELETE', params, })) as unknown as AxiosResponseEx
}

// 增加
const putAction = async (url: string, params: object): Promise<AxiosResponseEx> => {
  return (await service({ url, method: 'PUT', params, })) as unknown as AxiosResponseEx
}
export {
  getAction,
  postAction,
  delAction,
  putAction
}