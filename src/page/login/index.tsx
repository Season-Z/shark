import React from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { fetch } from "@/service/request";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import * as api from "@/service/api";

const Login: React.FC = () => {
  const router = useNavigate();

  const handleSubmit = async (values: any) => {
    const result = await fetch({ url: api.login, method: "post", data: { username: values.username, password: values.password } });

    if (result.success) {
      message.success("登录成功！");

      window.localStorage.setItem("token", result.result.token);
      router("/", { replace: true });
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-[url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')] bg-cover">
      <div
        style={{
          flex: "1",
          padding: "32px 0",
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: "75vw",
          }}
          // logo={<img alt="logo" src="../../assets/react.svg" />}
          title="Shark"
          subTitle="my world, my lowcode"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={handleSubmit}
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined />,
            }}
            placeholder="用户名: admin"
            rules={[
              {
                required: true,
                message: "请输入用户名",
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined />,
            }}
            placeholder="密码: 123456"
            rules={[
              {
                required: true,
                message: "请输入密码！",
              },
            ]}
          />
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
