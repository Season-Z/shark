import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import axios, { AxiosResponse } from "axios";
import { reqOptions } from "./config";
import type { CreateRequestConfig, RequestConfig, RequestInterceptors } from "./interface";
import { Error } from "./error";

class Request {
  // axios 实例
  instance: AxiosInstance;
  // 拦截器对象
  interceptorsObj?: RequestInterceptors<AxiosResponse>;
  // * 存放取消请求控制器Map
  abortControllerMap: Map<string, AbortController>;
  // 错误校验
  errorHandler: Error;

  constructor(config: CreateRequestConfig) {
    this.instance = axios.create(config);
    // * 初始化存放取消请求控制器Map
    this.abortControllerMap = new Map();
    this.interceptorsObj = config.interceptors;
    // 拦截器执行顺序 接口请求 -> 实例请求 -> 全局请求 -> 实例响应 -> 全局响应 -> 接口响应
    this.instance.interceptors.request.use(
      (res: InternalAxiosRequestConfig) => {
        const controller = new AbortController();
        const url = res.url || "";
        res.signal = controller.signal;
        this.abortControllerMap.set(url, controller);
        return res;
      },
      (err: any) => err
    );

    // 使用实例拦截器
    this.instance.interceptors.request.use(this.interceptorsObj?.requestInterceptors, this.interceptorsObj?.requestInterceptorsCatch);
    this.instance.interceptors.response.use(this.interceptorsObj?.responseInterceptors, this.interceptorsObj?.responseInterceptorsCatch);
    // 全局响应拦截器保证最后执行
    this.instance.interceptors.response.use(
      // 因为我们接口的数据都在res.data下，所以我们直接返回res.data
      (res: AxiosResponse) => {
        const url = res.config.url || "";
        this.abortControllerMap.delete(url);
        return res.data;
      },
      (err: any) => err
    );

    // 错误校验
    this.errorHandler = new Error();
  }
  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config as any);
      }
      this.instance
        .request<any, T>(config)
        .then((res: any) => {
          if (this.errorHandler.axiosErrorCheck(res)) {
            const jump = this.errorHandler.authCheck(res);

            if (jump) {
              window.location.href = "/login";
            }

            return;
          }

          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res);
          }

          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
  /**
   * 取消全部请求
   */
  cancelAllRequest() {
    for (const [, controller] of this.abortControllerMap) {
      controller.abort();
    }
    this.abortControllerMap.clear();
  }
  /**
   * 取消指定的请求
   * @param url 待取消的请求URL
   */
  cancelRequest(url: string | string[]) {
    const urlList = Array.isArray(url) ? url : [url];
    for (const _url of urlList) {
      this.abortControllerMap.get(_url)?.abort();
      this.abortControllerMap.delete(_url);
    }
  }
}

// * 创建请求实例
const request = new Request({
  baseURL: reqOptions.baseURL,
  timeout: reqOptions.timeout,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config) => {
      const { method = "GET" } = config;
      if (method === "get" || method === "GET") {
        config.params = config.data;
      }

      const token = window.localStorage.getItem("token");
      config.headers.Authorization = token;

      return config;
    },
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse) => {
      return result;
    },
  },
});

export default request;
export { RequestConfig, RequestInterceptors };
