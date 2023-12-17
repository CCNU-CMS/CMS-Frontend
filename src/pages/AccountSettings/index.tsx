import { getUserInfo, UpdateUserInfo, uploadAvatar } from '@/services/ant-design-pro/api';
import { useModel } from '@umijs/max';
import { Button, Input, message, Select, Upload, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import academy from './academy';
import './index.less';
// import academy from './academy.ts';
// const { confirm } = Modal;
const { Option } = Select;

const AccountSettings: React.FC = () => {
  const token = localStorage.getItem('token');
  // const [qiniuToken, setQiniuToken] = useState('');
  // const [uploadUrl, setUploadUrl] = useState('');
  const [avatar, setAvatar] = useState('');
  const { initialState, setInitialState } = useModel('@@initialState');
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

  // async function getQiNiuToken() {
  //   const res = await fetch('http://43.138.31.87:8082/api/v1/qiniu/token', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: token || '',
  //     },
  //   });
  //   return res.json();
  // }

  const updateInfo = () => {
    if (token) {
      getUserInfo(token)
        .then((res) => {
          if (res.status === 100) {
            setUserInfo(res.data);
            setAvatar(res.data.avatar);
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
            setAvatar(res.data.avatar);
            setFormValues(res.data);
          } else {
            message.error('获取用户信息失败，请重试！');
          }
        })
        .catch((error) => console.error(error));
      // getQiNiuToken().then((res) => {
      //   setQiniuToken(res.data.token);
      //   const config = {
      //     useCdnDomain: true,
      //     region: qiniu.region.cnEast2,
      //   };
      //   void qiniu.getUploadUrl(config, qiniuToken).then((r) => {
      //     console.log(r);
      //     setUploadUrl(r);
      //   });
      // });
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

  interface ResponseType {
    key: string;
    hash: string;
  }

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps<ResponseType>['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(newFileList[0]);
    const response = newFileList[0].response;
    if (response) {
      const avatar = `http://orderpal.muxixyz.com/${response.key}`;
      console.log(avatar);
      setAvatar(avatar);
      if (!initialState?.token || !initialState.identity) {
        flushSync(() => {
          setInitialState((s) => ({
            ...s,
            avatar: avatar,
          }));
        });
      }
      if (token) {
        uploadAvatar({ avatar }, token).then((res) => {
          if (res.status === 100) {
            message.success('上传成功！');
          }
        });
      }
      // const req = {
      //   avatar: avatar,
      //   name: userInfo.name,
      //   nickname: userInfo.nickname,
      //   school: userInfo.school,
      //   qq: userInfo.qq,
      // };
      // setUserInfo({ ...userInfo, avatar });
      // void post('/users/', req, true).then(
      //   (r: ChangeUserInfoResult) => {
      //     if (r.code === 200) {
      //       void message.success('更改成功！');
      //     } else {
      //       void message.error('更换头像失败，请重试！');
      //     }
      //   },
      //   (e) => {
      //     console.error(e);
      //     void message.error('更换头像失败，请重试！');
      //   },
      // );
    }
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
        <div className="avatar-box">
          <ImgCrop>
            <Upload<ResponseType>
              // action={uploadUrl}
              // data={{ token: qiniuToken }}
              fileList={fileList}
              onChange={onChange}
              showUploadList={false}
              maxCount={1}
            >
              <div className="avatar">
                <img src={avatar} alt="" />
              </div>
            </Upload>
          </ImgCrop>
          <ImgCrop>
            <Upload<ResponseType>
              // action={uploadUrl}
              // data={{ token: qiniuToken }}
              fileList={fileList}
              onChange={onChange}
              showUploadList={false}
              maxCount={1}
            >
              {/* <div className="change-avatar-box">
                <div className="change-avatar-btn">更换头像</div>
              </div> */}
            </Upload>
          </ImgCrop>
        </div>
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
