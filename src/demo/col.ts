import { MaterialType } from "@zxscls/model";

export const ColMeta: MaterialType = {
  title: "Col",
  componentName: "Col",
  npm: {
    package: "@zxscls/mock-material",
    exportName: "Col",
    name: "Col",
    version: "1.0.0",
  },
  icon: "https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_button.png",
  props: [
    {
      name: "style",
      title: "样式",
      valueType: "object",
      setters: ["JSONSetter"],
    },
  ],
  snippets: [
    {
      title: "列",
      snapshot: "https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_button.png",
      category: "HTML 元素",
      schema: {
        props: {},
      },
    },
  ],
  isContainer: true,
};
