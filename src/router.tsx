import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./page/dashboard";
import Playground from "./page/playground";
import Preview from "./page/previews";
import Login from "./page/login";

export const router: any = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/playground",
    element: <Playground />,
  },
  {
    path: "/preview",
    element: <Preview />,
  },
]);
