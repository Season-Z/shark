/*
 * @Author: zhouxishun
 * @Date: 2023-09-13 09:11:38
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-10-07 11:02:45
 * @Description:
 */
import { createHashRouter } from "react-router-dom";
import App from "./page/playgroud";
import Preview from "./page/previews";

export const router: any = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/preview",
    element: <Preview />,
  },
]);
