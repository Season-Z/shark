import { Button, message, Modal } from "antd";
import { FC } from "react";
import { EnginContext, plugins } from "@zxscls/engine";

const { DisplaySourceSchema } = plugins;

const HeaderView: FC<{ ctx: EnginContext }> = (props) => {
  const { ctx } = props;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: "10px",
      }}
    >
      {/* <Button
          style={{ marginRight: "10px" }}
          onClick={async () => {
            const res = await ctx.pluginManager.get("History");
            res?.exports.preStep();
          }}
        >
          <RollbackOutlined />
        </Button>
        <Button
          style={{ marginRight: "10px" }}
          onClick={async () => {
            const res = await ctx.pluginManager.get("History");
            res?.exports.nextStep();
          }}
        >
          <RollbackOutlined
            style={{
              transform: "rotateY(180deg)"
            }}
          />
        </Button> */}

      <DisplaySourceSchema pageModel={ctx.engine.pageModel} engineCtx={ctx}>
        <Button style={{ marginRight: "10px" }}>Source Code</Button>
      </DisplaySourceSchema>

      {/* <Button
          style={{ marginRight: "10px" }}
          onClick={() => {
            reloadPage();
          }}
        >
          Refresh Page
        </Button> */}
      <Button
        style={{ marginRight: "10px" }}
        onClick={() => {
          Modal.info({
            closable: true,
            icon: null,
            width: "calc(100vw - 100px)",
            centered: true,
            title: (
              <div>
                Preview
                <Button
                  size="small"
                  style={{
                    float: "right",
                    marginRight: "30px",
                  }}
                  onClick={() => {
                    window.open("/preview");
                  }}
                >
                  Open in new window
                </Button>
              </div>
            ),
            content: (
              <div
                style={{
                  width: "100%",
                  height: "calc(100vh - 200px)",
                }}
              >
                <iframe
                  style={{
                    border: "1px solid #e7e7e7",
                    width: "100%",
                    height: "100%",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                  src={"/preview"}
                />
              </div>
            ),
            footer: null,
          });
        }}
      >
        Preview
      </Button>
      <Button
        type="primary"
        onClick={() => {
          const newPage = ctx.engine.pageModel.export();
          localStorage.setItem("pageSchema", JSON.stringify(newPage));
          message.success("Save successfully");
        }}
      >
        Save
      </Button>
      <Button type="primary">构建</Button>
    </div>
  );
};

export default HeaderView;
