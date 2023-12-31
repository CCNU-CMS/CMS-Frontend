import {
  addCourse,
  deleteCourse,
  getAllCourseInfo,
  searchStudentInfo,
  studentAddCourse,
  updateCourse,
} from '@/services/ant-design-pro/api';
import { ExclamationCircleFilled } from '@ant-design/icons';
import {
  Button,
  ConfigProvider,
  Flex,
  Input,
  message,
  Modal,
  Select,
  Space,
  Table,
  Typography,
} from 'antd';
import Column from 'antd/es/table/Column';
import { useEffect, useState } from 'react';
import academyData from './academy';

const { Text } = Typography;

const { confirm } = Modal;

type AddModalProps = {
  isModalOpen: boolean;
  closeMoal: () => void;
  updateCourses: () => void;
};

const AddCourseModal = (props: AddModalProps) => {
  const token = localStorage.getItem('token');
  const { isModalOpen, updateCourses, closeMoal } = props;

  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [dept, setDept] = useState('');
  const [academy, setAcademy] = useState('计算机学院');
  const [classroom, setClassroom] = useState('');
  const [description, setDescription] = useState('');
  const [tAccount, setTAccount] = useState('');

  const handleOk = () => {
    if (!name || !time || !dept || !academy || !classroom || !description || !tAccount) {
      message.warning('请将信息填写完整！');
      return;
    }

    let data: API.AddCourseParams = {
      name: name,
      time: time,
      dept: dept,
      academy: academy,
      classroom: classroom,
      description: description,
      t_account: tAccount,
    };

    if (token) {
      addCourse(data, token).then((res) => {
        if (res.status === 100) {
          message.success('添加成功！');
          updateCourses();
          closeMoal();
        } else {
          message.error('添加课程失败，请重试！');
        }
      });
    }
  };

  const handleCancel = () => {
    closeMoal();
  };
  return (
    <>
      <Modal title="课程信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Flex vertical align="center" gap={16}>
          <Space>
            <span>课程名称:</span>
            <Input
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              style={{ width: 240 }}
              placeholder="请输入课程名称"
              allowClear
            />
          </Space>
          <Space>
            <span>教师工号:</span>
            <Input
              onChange={(e) => {
                setTAccount(e.target.value);
              }}
              value={tAccount}
              style={{ width: 240 }}
              placeholder="请输入教师工号"
              allowClear
            />
          </Space>
          <Space>
            <span>上课时间:</span>
            <Input
              onChange={(e) => {
                setTime(e.target.value);
              }}
              value={time}
              style={{ width: 240 }}
              placeholder="请输入上课时间"
              allowClear
            />
          </Space>
          <Space>
            <span>上课教室:</span>
            <Input
              onChange={(e) => {
                setClassroom(e.target.value);
              }}
              value={classroom}
              style={{ width: 240 }}
              placeholder="请输入上课教室"
              allowClear
            />
          </Space>
          <Space>
            <span>所属学院:</span>
            <Select
              style={{ width: 240 }}
              onChange={(value) => {
                setAcademy(value);
              }}
              value={academy}
              options={academyData}
            />
          </Space>
          <Space>
            <span>所属专业:</span>
            <Input
              onChange={(e) => {
                setDept(e.target.value);
              }}
              value={dept}
              style={{ width: 240 }}
              placeholder="请输入所属专业"
              allowClear
            />
          </Space>
          <Space>
            <span>课程描述:</span>
            <Input.TextArea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              style={{ width: 240 }}
              placeholder="请输入课程描述"
              allowClear
            />
          </Space>
        </Flex>
      </Modal>
    </>
  );
};

type UpdateModalProps = {
  course: API.CourseInfo;
  isModalOpen: boolean;
  closeMoal: () => void;
  updateCourses: () => void;
};

const UpdateCourseModal = (props: UpdateModalProps) => {
  const token = localStorage.getItem('token');
  const { course, isModalOpen, updateCourses, closeMoal } = props;
  const [name, setName] = useState(course.name);
  const [time, setTime] = useState(course.time);
  const [dept, setDept] = useState(course.dept);
  const [academy, setAcademy] = useState(course.academy);
  const [classroom, setClassroom] = useState(course.classroom);
  const [description, setDescription] = useState(course.description);

  const handleOk = () => {
    if (!name || !time || !dept || !academy || !classroom || !description) {
      message.warning('请将信息填写完整！');
      return;
    }

    let data: API.UpdateCourseParams = {
      name: name,
      time: time,
      dept: dept,
      academy: academy,
      classroom: classroom,
      description: description,
    };

    if (token) {
      updateCourse(course.id, data, token).then((res) => {
        if (res.status === 100) {
          message.success('修改课程信息成功！');
          updateCourses();
          closeMoal();
        } else {
          message.error('修改课程信息失败，请重试！');
        }
      });
    }
  };

  const handleCancel = () => {
    closeMoal();
  };
  return (
    <>
      <Modal title="课程信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Flex vertical align="center" gap={16}>
          <Space>
            <span>课程名称:</span>
            <Input
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              style={{ width: 240 }}
              placeholder="请输入课程名称"
              allowClear
            />
          </Space>
          <Space>
            <span>上课时间:</span>
            <Input
              onChange={(e) => {
                setTime(e.target.value);
              }}
              value={time}
              style={{ width: 240 }}
              placeholder="请输入上课时间"
              allowClear
            />
          </Space>
          <Space>
            <span>上课教室:</span>
            <Input
              onChange={(e) => {
                setClassroom(e.target.value);
              }}
              value={classroom}
              style={{ width: 240 }}
              placeholder="请输入上课教室"
              allowClear
            />
          </Space>
          <Space>
            <span>所属学院:</span>
            <Select
              style={{ width: 240 }}
              onChange={(value) => {
                setAcademy(value);
              }}
              value={academy}
              options={academyData}
            />
          </Space>
          <Space>
            <span>所属专业:</span>
            <Input
              onChange={(e) => {
                setDept(e.target.value);
              }}
              value={dept}
              style={{ width: 240 }}
              placeholder="请输入所属专业"
              allowClear
            />
          </Space>
          <Space>
            <span>课程描述:</span>
            <Input.TextArea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              style={{ width: 240 }}
              placeholder="请输入课程描述"
              allowClear
            />
          </Space>
        </Flex>
      </Modal>
    </>
  );
};

type StudentModalProps = {
  course: API.CourseInfo;
  isModalOpen: boolean;
  closeMoal: () => void;
};

type StudentInfo = {
  id: number;
  name: string;
  account: string;
  sex: string;
  dept: string;
  identity: number;
  avatar: string;
};

const StudentModal = (props: StudentModalProps) => {
  const token = localStorage.getItem('token');
  const { course, isModalOpen, closeMoal } = props;
  const [studentAccount, setStudentAccount] = useState('');
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    id: 0,
    name: '',
    account: '',
    sex: '',
    dept: '',
    identity: 0,
    avatar: '',
  });
  const [isExist, setIsExist] = useState(0);
  const handleOk = () => {
    if (isExist === -1) {
      message.error('学号不存在，加课失败！');
      setIsExist(0);
      setStudentAccount('');
      return;
    }

    if (isExist === 0) {
      message.warning('请输入学号');
      return;
    }

    if (token) {
      studentAddCourse(course.id, studentAccount, token)
        .then((res) => {
          if (res.status === 100) {
            message.success('加课成功！');
            closeMoal();
          }
        })
        .catch((e) => {
          console.error(e);
          message.error('加课失败！');
        });
    }
  };

  const handleBlur = () => {
    if (studentAccount === '') {
      // message.warning('请输入学号');
      return;
    }

    if (token) {
      searchStudentInfo(studentAccount, token)
        .then((res) => {
          if (res.status === 100) {
            setStudentInfo(res.data);
            setIsExist(1);
          }
        })
        .catch(() => {
          message.error('学号不存在！');
          setIsExist(-1);
        });
    }
  };

  const handleCancel = () => {
    closeMoal();
  };
  return (
    <>
      <Modal title="加课提示" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Flex
          style={{
            marginLeft: '60px',
          }}
          vertical
          align="start"
          gap={16}
        >
          <Space>
            <Text strong>课程名称：</Text>
            <Text>{course.name}</Text>
          </Space>
          <Space>
            <Text strong>任课老师：</Text>
            <Text>{course.teacher}</Text>
          </Space>
          <Space>
            <span>学生学号:</span>
            <Input
              onChange={(e) => {
                setStudentAccount(e.target.value);
                setIsExist(0);
              }}
              onBlur={handleBlur}
              value={studentAccount}
              style={{ width: 240 }}
              placeholder="请输入学生学号"
              allowClear
            />
          </Space>
          {isExist === 1 && (
            <>
              <Space>
                <Text strong>学生名称：</Text>
                <Text>{studentInfo.name}</Text>
              </Space>
              <Space>
                <Text strong>所在学院：</Text>
                <Text>{studentInfo.dept}</Text>
              </Space>
            </>
          )}
          {isExist === -1 && (
            <>
              <Space>
                <Text strong>学号不存在！</Text>
              </Space>
            </>
          )}
        </Flex>
      </Modal>
    </>
  );
};

const CourseManagement: React.FC = () => {
  const token = localStorage.getItem('token');
  const [allCourseInfo, setAllCourseInfo] = useState<API.CourseInfo[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState<API.CourseInfo>({
    id: 0,
    name: '',
    time: '',
    classroom: '',
    academy: '',
    dept: '',
    description: '',
    teacher: '',
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  const updateCourses = () => {
    if (token) {
      getAllCourseInfo({ page: page }, token)
        .then((res) => {
          if (res.status === 100) {
            // console.log(res.data.courses.content);
            setAllCourseInfo(res.data.courses);
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

  const handleDelete = (record: API.CourseInfo) => {
    confirm({
      title: '您确定要删除该课程吗?',
      icon: <ExclamationCircleFilled />,
      content: '删除后将不可恢复！',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        if (token) {
          deleteCourse(record.id, token).then((res) => {
            if (res.status === 100) {
              const newAllCourseInfo = allCourseInfo.filter((item) => item.id !== record.id);
              setAllCourseInfo(newAllCourseInfo);
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

  const showAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const showUpdateModal = (record: API.CourseInfo) => {
    // console.log('as');
    setSelectedCourse(record);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const showStudentModal = (record: API.CourseInfo) => {
    // console.log('as');
    setSelectedCourse(record);
    setIsStudentModalOpen(true);
  };

  const closeStudentModal = () => {
    setIsStudentModalOpen(false);
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
          <Button onClick={showAddModal}>新增</Button>
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
            render={(_: any, record: API.CourseInfo) => (
              <Space size="middle">
                <a onClick={() => showUpdateModal(record)}>编辑</a>
                <a onClick={() => handleDelete(record)}>删除</a>
                <a onClick={() => showStudentModal(record)}>加课</a>
              </Space>
            )}
          />
        </Table>
      </ConfigProvider>
      {isAddModalOpen && (
        <AddCourseModal
          isModalOpen={isAddModalOpen}
          updateCourses={updateCourses}
          closeMoal={closeAddModal}
        />
      )}
      {isUpdateModalOpen && (
        <UpdateCourseModal
          course={selectedCourse}
          isModalOpen={isUpdateModalOpen}
          updateCourses={updateCourses}
          closeMoal={closeUpdateModal}
        />
      )}
      {isStudentModalOpen && (
        <StudentModal
          course={selectedCourse}
          isModalOpen={isStudentModalOpen}
          closeMoal={closeStudentModal}
        />
      )}
    </>
  );
};

export default CourseManagement;
