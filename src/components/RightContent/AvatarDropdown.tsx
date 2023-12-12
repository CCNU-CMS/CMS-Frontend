import { getUserInfo, updatePassword } from '@/services/ant-design-pro/api';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useModel } from '@umijs/max';
import { Spin } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';

import { Flex, Input, message, Modal, Space, Typography } from 'antd';
const { Text } = Typography;

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

type UserInfo = {
  id?: number;
  name?: string;
  account?: string;
  sex?: string;
  dept?: string;
  identity?: number;
};

export const AvatarName = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserInfo(token).then((res) => {
        setUserInfo(res.data);
      });
    }
  }, []);

  return <span className="anticon">{userInfo.name}</span>;
};

type ModalProps = {
  isModalOpen: boolean;
  closeMoal: () => void;
};

const UpdateModal = (props: ModalProps) => {
  const token = localStorage.getItem('token');
  const { isModalOpen, closeMoal } = props;
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const handleOk = () => {
    if (newPassword === '' || oldPassword === '') {
      message.warning('请将信息填写完整！');
      return;
    }

    let data: API.UpdatePasswordParams = {
      old_password: oldPassword,
      new_password: newPassword,
    };

    if (token) {
      updatePassword(data, token)
        .then((res) => {
          if (res.status === 100) {
            message.success('修改密码成功！');
            closeMoal();
          }
        })
        .catch((e) => {
          console.error(e);
          message.error('修改密码失败,请重试！');
        });
    }
  };

  const handleCancel = () => {
    closeMoal();
  };
  return (
    <>
      <Modal title="修改密码" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Flex
          style={{
            marginLeft: '60px',
          }}
          vertical
          align="start"
          gap={16}
        >
          <Space>
            <Text>旧密码:</Text>
            <Input.Password
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
              value={oldPassword}
              style={{ width: 240 }}
              placeholder="请输入旧密码"
              allowClear
            />
          </Space>
          <Space>
            <Text>新密码:</Text>
            <Input.Password
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              value={newPassword}
              style={{ width: 240 }}
              placeholder="请输入新密码"
              allowClear
            />
          </Space>
        </Flex>
      </Modal>
    </>
  );
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    // await outLogin();
    // const { search, pathname } = window.location;
    // const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    // const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login') {
      localStorage.clear();
      history.replace({
        pathname: '/user/login',
        // search: stringify({
        //   redirect: pathname + search,
        // }),
      });
    }
  };
  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({ ...s, token: undefined, identity: undefined }));
        });
        loginOut();
        history.push('/user/login');
        return;
      } else if (key === 'updatePassword') {
        setIsModalOpen(true);
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={actionClassName}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const menuItems = [
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '个人设置',
    },
    {
      key: 'updatePassword',
      icon: <SettingOutlined />,
      label: '修改密码',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: onMenuClick,
          items: menuItems,
        }}
      >
        {children}
      </HeaderDropdown>
      {isModalOpen && <UpdateModal isModalOpen={isModalOpen} closeMoal={closeModal} />}
    </>
  );
};
