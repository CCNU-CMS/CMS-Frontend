import { getUserInfo, UpdateUserInfo } from '@/services/ant-design-pro/api';
import { Button, Input, message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import academy from './academy';
import './index.less';
// import academy from './academy.ts';
// const { confirm } = Modal;
const { Option } = Select;

const AccountSettings: React.FC = () => {
  const token = localStorage.getItem('token');
  const [userInfo, setUserInfo] = useState<API.UpdateUserParams>({
    name: '',
    account: '',
    sex: '',
    dept: '',
  });
  const [formValues, setFormValues] = useState<API.UpdateUserParams>({
    name: '',
    account: '',
    sex: '',
    dept: '',
  });

  const updateInfo = () => {
    if (token) {
      getUserInfo(token)
        .then((res) => {
          if (res.status === 100) {
            setUserInfo(res.data);
            setFormValues(res.data);
          } else {
            message.error('获取用户信息失败，请重试！');
          }
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    if (token) {
      getUserInfo(token)
        .then((res) => {
          if (res.status === 100) {
            setUserInfo(res.data);
            setFormValues(res.data);
          } else {
            message.error('获取用户信息失败，请重试！');
          }
        })
        .catch((error) => console.error(error));
    }
  }, []);

  const onFinish = () => {
    // 提交表单时触发更新用户信息的请求
    UpdateUserInfo(formValues, localStorage.getItem('token') || '')
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

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormValues({ ...formValues, name });
  };

  const changeAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const account = e.target.value;
    setFormValues({ ...formValues, account });
  };

  const changeSex = (e: string) => {
    const sex = e;
    setFormValues({ ...formValues, sex });
  };

  const changeDept = (e: string) => {
    const dept = e;
    setFormValues({ ...formValues, dept });
  };

  const onReset = () => {
    setFormValues(userInfo);
  };

  return (
    <>
      <div className="account-setting-wrap">
        <div className="form-item">
          <span className="form-item-lable">姓名</span>
          <Input
            className="form-item-field"
            value={formValues.name}
            onChange={(e) => changeName(e)}
          />
        </div>
        <div className="form-item">
          <span className="form-item-lable">账号</span>
          <Input
            className="form-item-field"
            value={formValues.account}
            onChange={(e) => changeAccount(e)}
          />
        </div>
        <div className="form-item">
          <span className="form-item-lable">性别</span>
          <Select
            className="form-item-field"
            value={formValues.sex}
            onChange={(e) => changeSex(e)}
            allowClear
          >
            <Option value="女">女</Option>
            <Option value="男">男</Option>
          </Select>
        </div>
        <div className="form-item">
          <span className="form-item-lable">学院</span>
          <Select
            className="form-item-field"
            value={formValues.dept}
            options={academy}
            onChange={(e) => changeDept(e)}
          ></Select>
        </div>
        <div className="form-item">
          <Button type="primary" onClick={onFinish}>
            更新
          </Button>
          <Button onClick={onReset}>重置</Button>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
