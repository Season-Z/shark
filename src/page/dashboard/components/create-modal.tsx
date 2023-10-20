import { Form, Input, Modal, Radio, message } from "antd";
import { FC } from "react";
import { fetch } from "@/service/request";
import * as api from "@/service/api";
import { useNavigate } from "react-router-dom";

interface CreateModalProps {
  visible: boolean;
  close: () => void;
}

interface FieldType {
  /** @param 工程名称 */
  projectName: string;
  /** @param 工程标识 */
  projectId: string;
  /** @param 工程类型 */
  projectType: string;
}

const CreateModal: FC<CreateModalProps> = (props) => {
  const { visible, close } = props;
  const [form] = Form.useForm();
  const router = useNavigate();

  const confirm = async () => {
    const data = await form.validateFields();

    const { result, success } = await fetch({ url: api.project, method: "post", data });

    if (success) {
      message.success("创建工程成功！");
      close();

      router("/playground", {
        state: {
          projectId: result.projectId,
          projectName: result.projectName,
        },
      });
    }
  };

  return visible ? (
    <Modal title="新建工程" open={visible} onOk={confirm} onCancel={close} okText="确定" cancelText="取消">
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }}>
        <Form.Item<FieldType> label="工程类型" name="projectType" rules={[{ required: true, message: "请选择工程类型!" }]}>
          <Radio.Group
            options={[
              { label: "web", value: "web" },
              { label: "小程序", value: "wechat" },
            ]}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>

        <Form.Item<FieldType> label="工程名称" name="projectName" rules={[{ required: true, message: "请输入工程名称!" }]}>
          <Input placeholder="请输入工程名称" />
        </Form.Item>

        <Form.Item<FieldType> label="工程标识" name="projectId" rules={[{ required: true, message: "请输入工程标识!" }]}>
          <Input placeholder="英文、数字以下划线隔开" />
        </Form.Item>
      </Form>
    </Modal>
  ) : null;
};

export default CreateModal;
