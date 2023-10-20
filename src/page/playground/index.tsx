import { useCallback, useEffect, useState } from "react";
import { Engine, EnginContext } from "@zxscls/engine";
import { DesignerPluginInstance } from "@zxscls/engine/dist/plugins/Designer/type";
import HeaderView from "./components/header-view";
import { assetPackagesList, assets, beforeInitRender, customRender } from "./config";
import "@zxscls/engine/dist/style.css";
import { BasePage } from "@/demo/base-page";
import { fetch, useFetch } from "@/service/request";
import * as api from "@/service/api";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { getUrlParams } from "@/utils";
import { CPageDataType } from "@zxscls/model";
import { message } from "antd";

const App = () => {
  const [ready, setReady] = useState(false);
  const [page, setPage] = useState(BasePage);

  const location = useLocation();

  const { loading, sendRequest } = useFetch({ url: api.buildApp, method: "post" }, { manual: true });

  const handleBuild = useCallback(
    async (schema: CPageDataType) => {
      const params = getUrlParams(location.search);
      const result = await sendRequest({ schema, projectId: params.projectId });

      if (result.success) {
        message.success("项目构建成功！");
      }
    },
    [location]
  );

  useEffect(() => {
    const localPage = localStorage.getItem("pageSchema");
    if (localPage) {
      setPage(JSON.parse(localPage));
    }
    setReady(true);
  }, []);

  const onReady = useCallback(
    async (ctx: EnginContext) => {
      const designer = await ctx.pluginManager.get<DesignerPluginInstance>("Designer");
      const reloadPage = async () => {
        setTimeout(() => {
          const designerExport = designer?.export;
          console.log("to reload");
          designerExport?.reload({
            assets,
          });
        }, 0);
      };

      reloadPage();

      const workbench = ctx.engine.getWorkbench();

      console.log("loading", loading);
      workbench?.replaceTopBarView(<HeaderView ctx={ctx} loading={loading} handleBuild={handleBuild} />);
    },
    [loading]
  );

  if (!ready) {
    return <>loading...</>;
  }
  return (
    <Engine
      schema={page}
      assetPackagesList={assetPackagesList}
      onReady={onReady}
      beforePluginRun={({ pluginManager }) => {
        pluginManager.customPlugin("Designer", (pluginInstance) => {
          pluginInstance.ctx.config.beforeInitRender = beforeInitRender;
          pluginInstance.ctx.config.customRender = customRender;
          return pluginInstance;
        });
      }}
    />
  );
};

export default App;
