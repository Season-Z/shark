import { useEffect, useState } from "react";
import { ReactAdapter, Render, useRender } from "@zxscls/render";

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
