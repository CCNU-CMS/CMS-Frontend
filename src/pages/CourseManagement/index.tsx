import { getAllCourseInfo } from '@/services/ant-design-pro/api';
import { Button, ConfigProvider, message, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { useEffect, useState } from 'react';

const token = localStorage.getItem('token');

// type ModalProps = {
//   isModalOpen: boolean;
//   closeMoal: () => void;
//   updateCourses: () => void;
// };

// const AddCourseModal = (props: ModalProps) => {
//   const { isModalOpen, updateCourses, closeMoal } = props;

//   const [name, setName] = useState('');
//   const [account, setAccount] = useState('');
//   const [password, setPassowrd] = useState('');
//   const [identity, setIdentity] = useState('0');

//   const handleOk = () => {
//     if (name === '' || account === '' || password === '') {
//       message.warning('请将信息填写完整！');
//       return;
//     }

//     let data: API.AddUserParams = {
//       name: name,
//       account: account,
//       password: password,
//       identity: Number(identity),
//     };

//     if (token) {
//       addCourse(data, token).then((res) => {
//         if (res.status === 100) {
//           message.success('添加成功！');
//           updateCourses();
//           closeMoal();
//         } else {
//           message.error('添加用户失败，请重试！');
//         }
//       });
//     }
//   };

//   const handleCancel = () => {
//     closeMoal();
//   };

//   return (
//     <>
//       <Modal title="用户信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
//         <Flex vertical align="center" gap={16}>
//           <Space>
//             <span>姓名:</span>
//             <Input
//               onChange={(e) => {
//                 setName(e.target.value);
//               }}
//               value={name}
//               style={{ width: 240 }}
//               placeholder="请输入姓名"
//             />
//           </Space>
//           <Space>
//             <span>账号:</span>
//             <Input
//               onChange={(e) => {
//                 setAccount(e.target.value);
//               }}
//               value={account}
//               style={{ width: 240 }}
//               placeholder="请输入账号"
//             />
//           </Space>
//           <Space>
//             <span>密码:</span>
//             <Input.Password
//               onChange={(e) => {
//                 setPassowrd(e.target.value);
//               }}
//               value={password}
//               style={{ width: 240 }}
//               placeholder="请输入密码"
//             />
//           </Space>
//           <Space>
//             <span>身份:</span>
//             <Select
//               defaultValue="0"
//               style={{ width: 240 }}
//               onChange={(value) => {
//                 setIdentity(value);
//               }}
//               value={identity}
//               options={[
//                 { value: '0', label: '学生' },
//                 { value: '1', label: '教师' },
//                 { value: '2', label: '管理员' },
//               ]}
//             />
//           </Space>
//         </Flex>
//       </Modal>
//     </>
//   );
// };

const CourseManagement: React.FC = () => {
  const [allCourseInfo, setAllCourseInfo] = useState<API.CourseInfo[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const updateCourses = () => {
    if (token) {
      getAllCourseInfo({ page: page }, token)
        .then((res) => {
          if (res.status === 100) {
            console.log(res.data.courses.content);
            setAllCourseInfo(res.data.courses.content);
            setTotal(res.data.size);
          } else {
            message.error('获取课程列表失败，请重试！');
          }
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    updateCourses();
  }, []);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

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
          <Button>新增</Button>
        </Space>
        <Table
          dataSource={allCourseInfo}
          pagination={{ total: total, pageSize: 10, onChange: handlePageChange }}
        >
          <Column title="ID" dataIndex="id" key="id" width={120} />
          <Column title="课程名称" dataIndex="name" key="name" width={120} />
          <Column title="授课老师" dataIndex="teacher" key="teacher" width={120} />
          <Column title="上课时间" dataIndex="time" key="time" width={180} />
          <Column title="上课教室" dataIndex="classroom" key="classroom" width={120} />
          <Column title="所属学院" dataIndex="academy" key="academy" width={180} />
          <Column title="所属专业" dataIndex="dept" key="dept" width={180} />
          <Column title="课程描述" dataIndex="description" key="description" width={300} />
          <Column
            title="Action"
            key="action"
            render={() => (
              <Space size="middle">
                <a>编辑</a>
                <a>删除</a>
              </Space>
            )}
          />
        </Table>
      </ConfigProvider>
      {/* {isModalOpen && (
        <AddCourseModal
          isModalOpen={isModalOpen}
          updateCourses={updateCourses}
          closeMoal={closeModal}
        />
      )} */}
    </>
  );
};

export default CourseManagement;
