import {
  addUser,
  deleteUser,
  getAllUserInfo,
  getOneTyUserInfo,
} from '@/services/ant-design-pro/api';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, ConfigProvider, Flex, Input, message, Modal, Select, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { useEffect, useState } from 'react';

const { confirm } = Modal;

const token = localStorage.getItem('token');

type ModalProps = {
  isModalOpen: boolean;
  closeMoal: () => void;
  updateUsers: () => void;
};

const AddUserModal = (props: ModalProps) => {
  const { isModalOpen, updateUsers, closeMoal } = props;

  const [name, setName] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassowrd] = useState('');
  const [identity, setIdentity] = useState('0');

  const handleOk = () => {
    if (name === '' || account === '' || password === '') {
      message.warning('请将信息填写完整！');
      return;
    }

    let data: API.AddUserParams = {
      name: name,
      account: account,
      password: password,
      identity: Number(identity),
    };

    if (token) {
      addUser(data, token).then((res) => {
        if (res.status === 100) {
          message.success('添加成功！');
          updateUsers();
          closeMoal();
        } else {
          message.error('添加用户失败，请重试！');
        }
      });
    }
  };

  const handleCancel = () => {
    closeMoal();
  };

  return (
    <>
      <Modal title="用户信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Flex vertical align="center" gap={16}>
          <Space>
            <span>姓名:</span>
            <Input
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              style={{ width: 240 }}
              placeholder="请输入姓名"
            />
          </Space>
          <Space>
            <span>账号:</span>
            <Input
              onChange={(e) => {
                setAccount(e.target.value);
              }}
              value={account}
              style={{ width: 240 }}
              placeholder="请输入账号"
            />
          </Space>
          <Space>
            <span>密码:</span>
            <Input.Password
              onChange={(e) => {
                setPassowrd(e.target.value);
              }}
              value={password}
              style={{ width: 240 }}
              placeholder="请输入密码"
            />
          </Space>
          <Space>
            <span>身份:</span>
            <Select
              defaultValue="0"
              style={{ width: 240 }}
              onChange={(value) => {
                setIdentity(value);
              }}
              value={identity}
              options={[
                { value: '0', label: '学生' },
                { value: '1', label: '教师' },
                { value: '2', label: '管理员' },
              ]}
            />
          </Space>
        </Flex>
      </Modal>
    </>
  );
};

const UserManagement: React.FC = () => {
  const [allUserInfo, setAllUserInfo] = useState<API.DetailUserInfo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [identity, setIdentity] = useState('-1');
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const identityTable: { [key: number]: string } = {
    '-1': '全部',
    0: '学生',
    1: '教师',
    2: '管理员',
  };

  const updateUsers = () => {
    if (token) {
      const params = {
        page: page,
        identity: Number(identity),
      };
      if (Number(identity) !== -1) {
        getOneTyUserInfo(params, token).then((res: API.GetOneTypeUserInfoResult) => {
          // console.log(res.data.users);
          setAllUserInfo(res.data.users);
        });
      } else {
        getAllUserInfo(params, token).then((res: API.GetAllUserInfoResult) => {
          // console.log(res.data.users);
          setAllUserInfo(res.data.users?.content);
          if (total !== res.data.size) {
            setTotal(res.data.size);
          }
        });
      }
    }
  };

  useEffect(() => {
    updateUsers();
  }, [identity, page]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (record: API.DetailUserInfo) => {
    confirm({
      title: '您确定要删除该用户吗?',
      icon: <ExclamationCircleFilled />,
      content: '删除后将不可恢复！',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        if (token) {
          deleteUser({ account: record.account }, token).then((res) => {
            if (res.status === 100) {
              const newAllUserInfo = allUserInfo.filter((item) => item.id !== record.id);
              setAllUserInfo(newAllUserInfo);
              message.success('删除成功！');
            } else {
              message.error('删除失败，请重试！');
            }
          });
        }
      },
      onCancel() {},
    });
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: '#2fa678',
              headerColor: '#fff',
            },
            Button: {
              defaultBg: '#e9e9e9',
            },
          },
        }}
      >
        <Space
          style={{
            width: '100%',
            display: 'flex',
            // justifyContent: 'flex-end',
            padding: '16px',
          }}
        >
          <span>身份:</span>
          <Select
            defaultValue="0"
            style={{ width: 240 }}
            onChange={(value) => {
              setIdentity(value);
            }}
            value={identity}
            options={[
              { value: '-1', label: '全部' },
              { value: '0', label: '学生' },
              { value: '1', label: '教师' },
              { value: '2', label: '管理员' },
            ]}
          />
          <Button onClick={showModal}>新增</Button>
        </Space>
        <Table
          dataSource={allUserInfo}
          pagination={{ total: total, pageSize: 10, onChange: handlePageChange }}
        >
          <Column title="ID" dataIndex="id" key="id" />
          <Column title="姓名" dataIndex="name" key="name" />

          <Column title="账号" dataIndex="account" key="account" />
          <Column title="性别" dataIndex="sex" key="sex" />
          <Column title="专业" dataIndex="dept" key="dept" />
          <Column
            title="身份"
            dataIndex="identity"
            key="identity"
            render={(_: any, record: API.DetailUserInfo) => (
              <Space size="middle">
                <span>{identityTable[record.identity]}</span>
              </Space>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(_: any, record: API.DetailUserInfo) => (
              <Space size="middle">
                <a onClick={() => handleDelete(record)}>Delete</a>
              </Space>
            )}
          />
        </Table>
      </ConfigProvider>
      {isModalOpen && (
        <AddUserModal isModalOpen={isModalOpen} updateUsers={updateUsers} closeMoal={closeModal} />
      )}
    </>
  );
};

export default UserManagement;
