/*
 * @Author: zhouxishun
 * @Date: 2023-09-13 09:11:38
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-10-07 11:18:44
 * @Description:
 */
import { BasePage } from "@octopus/demo-page";
import { useCallback, useEffect, useState } from "react";
import { Engine, EnginContext } from "@octopus/engine";
import { DesignerPluginInstance } from "@octopus/engine/dist/plugins/Designer/type";
import HeaderView from "./components/header-view";
import { assetPackagesList, assets, beforeInitRender, customRender } from "./config";
import "@octopus/engine/dist/style.css";

const App = () => {
  const [ready, setReady] = useState(false);
  const [page, setPage] = useState(BasePage);

  useEffect(() => {
    const localPage = localStorage.getItem("pageSchema");
    if (localPage) {
      setPage(JSON.parse(localPage));
    }
    setReady(true);
  }, []);

  const onReady = useCallback(async (ctx: EnginContext) => {
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

    workbench?.replaceTopBarView(<HeaderView ctx={ctx} />);
  }, []);

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
