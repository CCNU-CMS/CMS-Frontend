import { getUserInfo, UpdateUserInfo } from '@/services/ant-design-pro/api';
import { Button, Form, Input, message, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import academy from './academy';
// import academy from './academy.ts';
// const { confirm } = Modal;
const { Option } = Select;
const token = localStorage.getItem('token');

const AccountSettings: React.FC = () => {
  const [userInfo, setUserInfo] = useState<API.UpdateUserParams>({
    name: '',
    account: '',
    sex: '',
    dept: '',
  });
  const [form] = Form.useForm();

  const updateInfo = () => {
    if (token) {
      getUserInfo(token)
        .then((res) => {
          if (res.status === 100) {
            setUserInfo(res.data);
            form.setFieldsValue(res.data);
          } else {
            message.error('获取用户信息失败，请重试！');
          }
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    updateInfo();
  }, []);

  const onFinish = (values: API.UpdateUserParams) => {
    // 提交表单时触发更新用户信息的请求
    UpdateUserInfo(values, localStorage.getItem('token') || '')
      .then((res) => {
        if (res.status === 100) {
          // 更新用户信息成功，可以做一些提示处理
          message.success('用户信息更新成功');
          updateInfo();
        } else {
          // 更新用户信息失败，可以做一些提示处理
          message.error('用户信息更新失败');
        }
      })
      .catch((error) => console.error(error));
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="个人信息"
      onFinish={onFinish}
      initialValues={userInfo}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
    >
      <Form.Item name="name" label="姓名">
        <Input placeholder={userInfo.name} />
      </Form.Item>
      <Form.Item name="account" label="账号">
        <Input placeholder={userInfo.account} />
      </Form.Item>
      <Form.Item name="sex" label="性别">
        <Select placeholder={userInfo.sex} allowClear>
          <Option value="女">女</Option>
          <Option value="男">男</Option>
        </Select>
      </Form.Item>
      <Form.Item name="dept" label="学院">
        <Select options={academy}></Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Space style={{ padding: 10 }}>
          <Button type="primary" htmlType="submit">
            更新
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default AccountSettings;
