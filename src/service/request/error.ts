import { message } from "antd";
import { axiosErrorMap } from "./config";
import { AxiosError } from "axios";

export class Error {
  constructor() {}

  axiosErrorCheck(res: AxiosError) {
    const hasError = axiosErrorMap.has(res.code as string);

    if (hasError) {
      message.error(`请求失败：${res.message}`);
    }

    return hasError;
  }

  authCheck(res: AxiosError) {
    const { status, data } = res.response || {};
    const unauthorized = [401, 403].includes(status as number);

    // 是否跳转login
    let jump = unauthorized;
    if ((data as any).path === "/user/login") {
      jump = false;
    }

    return jump;
  }
}
