/**
 * 存储 localStorage
 * @param name 名称
 * @param content 内容
 * @returns 
 */
export const setStronge = (name: string, content: any) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取 localStorage
*/
export const getStore = (name: string) => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除 localStorage
*/
export const removeStorage = (name: string) => {
  if (!name) return;
  window.localStorage.removeItem(name);
}