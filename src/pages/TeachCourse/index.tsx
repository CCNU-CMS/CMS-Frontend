import { getAllChooseCourseInfo, getClassCourseStudents } from '@/services/ant-design-pro/api';
import { Button, ConfigProvider, message, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import React, { useEffect, useState } from 'react';

const TeachCourse: React.FC = () => {
  const token = localStorage.getItem('token');
  const [allChooseCourseInfo, setAllChooseCourseInfo] = useState<API.CourseInfo[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [total1, setTotal1] = useState(0);
  const [page1, setPgae1] = useState(1);
  const [studentInfo, setStudentInfo] = useState<API.DetailUserInfo[]>([]);
  const [showStudents, setShowStudents] = useState(false);

  const updateCourses = () => {
    if (token) {
      getAllChooseCourseInfo({ page: page }, token)
        .then((res) => {
          if (res.status === 100) {
            // console.log(res.data.courses.content);
            setAllChooseCourseInfo(res.data.courses);
            setTotal(res.data.size);
          } else {
            message.error('获取课程列表失败，请重试！');
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const getStudentInfo = (id: number) => {
    let params: API.GetClassStudentsParams = {
      course_id: id,
      identity: 0,
      page: page1,
    };
    if (token) {
      getClassCourseStudents(params, token).then((res) => {
        if (res.status === 100) {
          setStudentInfo(res.data.users);
          setShowStudents(true);
          setTotal1(res.data.size);
        } else {
          message.error('获取学生信息失败，请重试!');
        }
      });
    }
  };

  useEffect(() => {
    updateCourses();
  }, []);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handlePageChange1 = (page: number) => {
    setPgae1(page);
  };
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: '#2fa678',
              headerColor: '#fff',
              fontSize: 16,
              colorText: '#121212',
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
          {showStudents && <Button onClick={() => setShowStudents(false)}>返回</Button>}
        </Space>
        {!showStudents && (
          <Table
            dataSource={allChooseCourseInfo}
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
                  <a onClick={() => getStudentInfo(record.id)}>查看学生</a>
                </Space>
              )}
            />
          </Table>
        )}
        {showStudents && (
          <Table
            dataSource={studentInfo}
            pagination={{ total: total1, pageSize: 10, onChange: handlePageChange1 }}
          >
            <Column title="ID" dataIndex="id" key="id" />
            <Column title="姓名" dataIndex="name" key="name" />
            <Column title="账号" dataIndex="account" key="account" />
            <Column title="性别" dataIndex="sex" key="sex" />
            <Column title="学院" dataIndex="dept" key="dept" />
          </Table>
        )}
      </ConfigProvider>
    </>
  );
};

export default TeachCourse;
