import request from "./request";

import type { FetchRequestConfig, FetchResponse } from "./interface";

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {FetchRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const fetch = <D = any, T = any>(config: FetchRequestConfig<D, T>) => {
  return request.request<FetchResponse<T>>(config);
};

export default fetch;
