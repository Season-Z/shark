/*
 * @Author: zhouxishun
 * @Date: 2023-10-07 11:06:53
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-10-07 11:17:55
 * @Description:
 */

import React from "react";
import ReactDOM from "react-dom";
import ReactDOMClient from "react-dom/client";
import "@octopus/engine/dist/style.css";
import { LayoutPropsType } from "@octopus/engine";
import { AssetPackage } from "@octopus/model";

export const assets: AssetPackage[] = [
  {
    package: "antd",
    globalName: "antd",
    resources: [
      {
        src: "https://cdn.bootcdn.net/ajax/libs/antd/5.1.2/reset.css",
      },
      {
        src: "https://cdn.bootcdn.net/ajax/libs/dayjs/1.11.7/dayjs.min.js",
      },
      {
        src: "https://cdn.bootcdn.net/ajax/libs/antd/5.1.2/antd.js",
      },
    ],
  },
];

export const assetPackagesList = [
  {
    package: "@octopus/mock-material",
    globalName: "antd",
    resources: [
      {
        src: "https://cdn.bootcdn.net/ajax/libs/antd/5.1.2/reset.css",
      },
      {
        src: "https://cdn.bootcdn.net/ajax/libs/dayjs/1.11.7/dayjs.min.js",
      },
      {
        src: "https://cdn.bootcdn.net/ajax/libs/antd/5.1.2/antd.js",
      },
    ],
  },
];

export const beforeInitRender: LayoutPropsType["beforeInitRender"] = async ({ iframe }) => {
  const subWin = iframe.getWindow();
  if (!subWin) {
    return;
  }
  (subWin as any).React = React;
  (subWin as any).ReactDOM = ReactDOM;
  (subWin as any).ReactDOMClient = ReactDOMClient;
};

export const customRender: LayoutPropsType["customRender"] = async ({ iframe: iframeContainer, assets, page, pageModel, ready }) => {
  await iframeContainer.injectJS("./render.umd.js");
  const iframeWindow = iframeContainer.getWindow()!;
  const iframeDoc = iframeContainer.getDocument()!;
  const IframeReact = iframeWindow.React!;
  const IframeReactDOM = iframeWindow.ReactDOMClient!;
  const CRender = iframeWindow.CRender!;

  // 注入组件物料资源
  const assetLoader = new CRender.AssetLoader(assets, {
    window: iframeContainer.getWindow()!,
  });
  assetLoader
    .onSuccess(() => {
      const App = IframeReact?.createElement(CRender.DesignRender, {
        adapter: CRender?.ReactAdapter,
        page: page,
        pageModel: pageModel,
        onMount: (designRenderInstance) => {
          ready(designRenderInstance);
        },
      });

      IframeReactDOM.createRoot(iframeDoc.getElementById("app")!).render(App);
    })
    .onError(() => {
      console.log("资源加载出粗");
    })
    .load();
};
