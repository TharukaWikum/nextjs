"use client";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import styles from "./login.module.css";

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();

  const onFinish = (values: any) => {
    setLoading(true);
    // handle login logic here
    console.log("Received values:", values);
    setLoading(false);
  };

  const buttonColor = theme === "dark" ? "lightgray" : "darkgray";
  const txtcolor = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-form"]}>
        <h1>Login</h1>
        <Form form={form} name="login" onFinish={onFinish}>
        <Form.Item
  name="username"
  rules={[{ required: true, message: 'Please enter your username!' }]}
  className={`${styles['form-item']} ${theme === 'dark' ? styles['dark-theme'] : styles['light-theme']}`}
>
  <Input placeholder="Username" />
</Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              className="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ backgroundColor: buttonColor, color: txtcolor }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
