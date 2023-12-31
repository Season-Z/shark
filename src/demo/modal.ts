import { MaterialType } from "@zxscls/model";

export const ModalMeta: MaterialType = {
  title: "Modal",
  componentName: "Modal",
  npm: {
    package: "@zxscls/mock-material",
    exportName: "Modal",
    version: "1.0.0",
    name: "Modal",
  },
  icon: "https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_button.png",
  props: [
    {
      name: "visible",
      title: "可见性",
      valueType: "boolean",
      setters: ["BooleanSetter", "ExpressionSetter"],
    },
  ],
  fixedProps: {
    open: true,
    getContainer: false,
  },
  rootSelector: ".ant-modal-content",
  snippets: [
    {
      title: "基础元素",
      snapshotText: "Modal",
      category: "高级组件",
      schema: {
        props: {},
        children: ["I am a Modal"],
      },
    },
  ],
};
