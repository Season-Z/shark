export const getUrlParams = (url: string) => {
  // 定义一个 parse url.search 的方法
  function parse(url: string) {
    const obj: Record<string, any> = {};
    url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (obj[k] = v));
    return obj;
  }
  const u = url.split("#").shift();
  return parse(u as string);
};
