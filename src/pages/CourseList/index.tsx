import { chooseCourse, getAllCourseInfo } from '@/services/ant-design-pro/api';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { ConfigProvider, message, Modal, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import React, { useEffect, useState } from 'react';

const { confirm } = Modal;

const token = localStorage.getItem('token');

const CourseList: React.FC = () => {
  const [allChooseCourseInfo, setAllChooseCourseInfo] = useState<API.CourseInfo[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const updateCourses = () => {
    if (token) {
      getAllCourseInfo({ page: page }, token)
        .then((res) => {
          if (res.status === 100) {
            setAllChooseCourseInfo(res.data.courses);
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
  }, [page, token]);

  const handleChoose = (record: API.CourseInfo) => {
    confirm({
      title: '您确定要选择该课程吗?',
      icon: <ExclamationCircleFilled />,
      content: '选择后将会加入您的课程列表！',
      okText: 'Yes',
      okType: 'primary',
      cancelText: 'No',
      onOk() {
        if (token) {
          chooseCourse(record.id, token).then((res) => {
            if (res.status === 100) {
              message.success('选择成功！');
              // 这里可能需要更新数据重新获取已选择的课程信息
              updateCourses();
            } else {
              message.error('选择失败，请重试！');
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
            padding: '16px',
          }}
        ></Space>
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
                <a onClick={() => handleChoose(record)}>加课</a>
              </Space>
            )}
          />
        </Table>
      </ConfigProvider>
    </>
  );
};

export default CourseList;
