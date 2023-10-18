import React from "react";
import ReactDOM from "react-dom";
import ReactDOMClient from "react-dom/client";
import "@zxscls/engine/dist/style.css";
import { LayoutPropsType } from "@zxscls/engine";
import { AssetPackage } from "@zxscls/model";
import { DesignRender } from "@zxscls/render";

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
    package: "@zxscls/mock-material",
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
  // @ts-ignore
  const CRender = iframeWindow.Render!;

  // 注入组件物料资源
  const assetLoader = new CRender.AssetLoader(assets, {
    window: iframeContainer.getWindow()!,
  });
  assetLoader
    .onSuccess(() => {
      const App = IframeReact?.createElement(CRender.DesignRender, {
        // @ts-ignore
        adapter: CRender?.ReactAdapter,
        page: page,
        pageModel: pageModel,
        onMount: (designRenderInstance: DesignRender) => {
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
