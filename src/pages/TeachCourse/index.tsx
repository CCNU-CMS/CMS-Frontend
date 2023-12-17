import {
  getAllChooseCourseInfo,
  getClassCourseStudents,
  giveScore,
} from '@/services/ant-design-pro/api';
import { Button, ConfigProvider, InputNumber, message, Modal, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import React, { useEffect, useState } from 'react';

const TeachCourse: React.FC = () => {
  const token = localStorage.getItem('token');
  const [allChooseCourseInfo, setAllChooseCourseInfo] = useState<API.CourseGradesInfo[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [total1, setTotal1] = useState(0);
  const [page1, setPgae1] = useState(1);
  const [studentInfo, setStudentInfo] = useState<API.UserGradesInfo[]>([]);
  const [showStudents, setShowStudents] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(0);
  const [selectedStudentInfo, setSelectedStudentInfo] = useState<API.UserGradesInfo>({
    id: 0,
    name: '',
    account: '',
    password: '',
    sex: '',
    dept: '',
    identity: 0,
    grade: '',
  });

  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStudentInfo = (id: number) => {
    setSelectedCourseId(id);
    let params: API.GetClassStudentsParams = {
      course_id: id,
      identity: 0,
      page: page1,
    };
    if (token) {
      getClassCourseStudents(params, token).then((res) => {
        if (res.status === 100) {
          const newData = res.data.usersWithGrades.map((item) => {
            return {
              ...item.user,
              grade: item.grade || '未打分',
            };
          });
          setStudentInfo(newData);
          setShowStudents(true);
          setTotal1(res.data.size);
        } else {
          message.error('获取学生信息失败，请重试!');
        }
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const makeScore = () => {
    if (!score) {
      message.warning('成绩不能为空！');
      return;
    }

    let data: API.GiveScoreParams = {
      courseId: selectedCourseId,
      saccount: selectedStudentInfo.account,
      grade: Number(score),
    };

    if (token) {
      giveScore(data, token).then((res) => {
        if (res.status === 100) {
          message.success('打分成功!');
          handleCancel();
        }
      });
    }
  };

  const showModal = (record: API.UserGradesInfo) => {
    setSelectedStudentInfo(record);
    setIsModalOpen(true);
    if (record.grade) {
      setScore(Number(record.grade));
    }
  };

  const handleOk = () => {
    makeScore();
  };

  const updateCourses = () => {
    if (token) {
      getAllChooseCourseInfo({ page: page }, token)
        .then((res) => {
          if (res.status === 100) {
            // console.log(res.data.courses.content);
            const newData: API.CourseGradesInfo[] = res.data.coursesWithGrades.map((item) => {
              return {
                ...item.course,
                grade: item.grade,
              };
            });
            setAllChooseCourseInfo(newData);
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
            <Column title="成绩" dataIndex="grade" key="grade" />
            <Column
              title="Action"
              key="action"
              render={(_: any, record: API.UserGradesInfo) => (
                <Space size="middle">
                  <a
                    style={{
                      cursor: 'cursor',
                    }}
                    onClick={() => showModal(record)}
                  >
                    打分
                  </a>
                </Space>
              )}
            />
          </Table>
        )}
      </ConfigProvider>
      {isModalOpen && (
        <Modal title="设置成绩" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <InputNumber
              type="number"
              value={score}
              onChange={(value) => setScore(Number(value))}
              min={1}
              max={100}
              style={{
                width: '40%',
              }}
              width={120}
              placeholder="请输入成绩"
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default TeachCourse;
