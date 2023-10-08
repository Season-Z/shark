/*
 * @Author: zhouxishun
 * @Date: 2023-09-13 09:11:38
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-10-07 11:02:45
 * @Description:
 */
import { createHashRouter } from "react-router-dom";
import Dashboard from "./page/dashboard";
import Playground from "./page/playground";
import Preview from "./page/previews";

export const router: any = createHashRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/",
    element: <Playground />,
  },
  {
    path: "/preview",
    element: <Preview />,
  },
]);
