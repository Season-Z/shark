/*
 * @Author: zhouxishun
 * @Date: 2023-09-13 09:11:38
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-10-07 11:03:33
 * @Description:
 */
import { useEffect, useState } from "react";
import { ReactAdapter, Render, useRender } from "@octopus/render";

const Preview = () => {
  const [page, setPage] = useState();
  const renderHandle = useRender();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const localPage = localStorage.getItem("pageSchema");
    if (localPage) {
      setPage(JSON.parse(localPage));
      setLoading(false);
    }
  }, []);
  if (loading) {
    return <>Not find page info on local, please ensure you save it on editor</>;
  }
  return (
    <div className="App" style={{ overflow: "auto", height: "100%" }}>
      <Render page={page} render={renderHandle as any} adapter={ReactAdapter} />
    </div>
  );
};

export default Preview;
