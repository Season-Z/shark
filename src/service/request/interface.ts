import type { AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from "axios";
export interface RequestInterceptors<T> {
  // 请求拦截
  requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => any;
  // 响应拦截
  responseInterceptors?: (config: T) => T;
  responseInterceptorsCatch?: (err: any) => any;
}
// 自定义传入的参数
export interface CreateRequestConfig<T = AxiosResponse> extends CreateAxiosDefaults {
  interceptors?: RequestInterceptors<T>;
}
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>;
}
export interface CancelRequestSource {
  [index: string]: () => void;
}

export interface FetchResponse<T> {
  /** @param 编码 */
  code: string;
  message: string;
  result: T;
  status: number;
  success: boolean;
}

// 重写返回类型
export interface FetchRequestConfig<T, R> extends RequestConfig<FetchResponse<R>> {
  url: string;
  /** @param 请求入参 */
  data?: T;
}

export interface FetchOptions {
  /** @param 是否手动控制请求，而不是初始化就发送 */
  manual?: boolean;
}
