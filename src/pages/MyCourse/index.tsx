import { dropCourse, getAllChooseCourseInfo } from '@/services/ant-design-pro/api';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { ConfigProvider, message, Modal, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import React, { useEffect, useState } from 'react';

const { confirm } = Modal;

const token = localStorage.getItem('token');

const ChoosedCourse: React.FC = () => {
  const [allChooseCourseInfo, setAllChooseCourseInfo] = useState<API.CourseGradesInfo[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const updateCourses = () => {
    if (token) {
      getAllChooseCourseInfo({ page: page }, token)
        .then((res) => {
          if (res.status === 100) {
            // console.log(res.data.courses.content);
            const newData: API.CourseGradesInfo[] = res.data.coursesWithGrades.map((item) => {
              return {
                ...item.course,
                grade: item.grade || '未打分',
              };
            });
            console.log(newData);
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

  const handleDrop = (record: API.CourseGradesInfo) => {
    confirm({
      title: '您确定要退掉该课程吗?',
      icon: <ExclamationCircleFilled />,
      content: '退掉后将不可恢复！',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        if (token) {
          dropCourse(record.id, token).then((res) => {
            if (res.status === 100) {
              const newAllCourseInfo = allChooseCourseInfo.filter((item) => item.id !== record.id);
              setAllChooseCourseInfo(newAllCourseInfo);
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
          {/* <Button onClick={showAddModal}>新增</Button> */}
        </Space>
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
          <Column title="课程分数" dataIndex="grade" key="grade" width={120} />
          <Column
            title="Action"
            key="action"
            render={(_: any, record: API.CourseGradesInfo) => (
              <Space size="middle">
                <a onClick={() => handleDrop(record)}>退课</a>
              </Space>
            )}
          />
        </Table>
      </ConfigProvider>
    </>
  );
};

export default ChoosedCourse;
