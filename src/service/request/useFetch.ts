/*
 * @Author: zhouxishun
 * @Date: 2023-09-06 10:40:24
 * @LastEditors: longhe.li
 * @LastEditTime: 2023-09-21 10:17:47
 * @Description:hook发起请求。默认绑定了监听 config 入参的变化，config 变化会触发接口的请求
 */

import useDepEffect from '@/hooks/useDepEffect';
import useMount from '@/hooks/useMount';
import { useCallback, useRef, useState } from 'react';
import { FetchOptions, FetchRequestConfig, FetchResponse } from './interface';
import request from './request';

/**
 * @description: hook请求
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {FetchRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const useFetch = <D = any, T = any>(config: FetchRequestConfig<D, T>, options?: FetchOptions) => {
  // loading状态
  const [loading, setLoading] = useState<boolean>(false);
  // 接口返回的数据
  const [data, setData] = useState<T>();

  const configRef = useRef(config);
  configRef.current = config;

  // * 异步请求
  const requestFn = useCallback((data?: T): Promise<FetchResponse<T>> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      request
        .request<FetchResponse<T>>({ ...configRef.current, data })
        .then((res) => {
          setData(res.data);
          resolve(res);
          return res;
        })
        .catch((err) => {
          reject(err);
          return { err };
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, []);

  /**
   * 发送请求
   */
  const sendRequest = (data?: T) => requestFn(data);

  /**
   * 取消请求
   * @param url 取消的url名称
   * @returns void
   */
  const cancel = () => request.cancelRequest(configRef.current.url);

  /**
   * 取消全部请求
   * @returns
   */
  const cancelAll = () => request.cancelAllRequest();

  useMount(() => {
    if (!options?.manual) {
      requestFn();
    }
  });

  useDepEffect(() => {
    if (!options?.manual) {
      requestFn();
    }
  }, [configRef.current]);

  return { loading, data, sendRequest, cancel, cancelAll };
};

export default useFetch;
