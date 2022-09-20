import { ElMessage } from "element-plus";
import { postAction } from "../utils/http"

/**
 * 用户登录
 * @param username 用户名
 * @param password 密码
 * @param isConfirmAgreement 是否同意用户协议
 * @returns token
*/
const userLogin = async (username: string, password: string, isConfirmAgreement: boolean): Promise<string> => {
  const res = await postAction('/login', { username, password, isConfirmAgreement });

  if (res.code === 0) {
    return res.data.token;
  }

  if (res.code === 999) {
    ElMessage.error(res.message)
  }
  return ''
}

export {
  userLogin
}