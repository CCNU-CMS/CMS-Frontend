import { getAllPostInfo } from '@/services/ant-design-pro/api';
import { Divider, Tag } from 'antd';
import { useEffect } from 'react';
import './index.less';

const token = localStorage.getItem('token');

const Post: React.FC = () => {
  return (
    <div className="post-box">
      <div className="user-box">
        <div className="user-box-name">无纸化</div>
        <div className="user-box-account">2021214115</div>
      </div>
      <div className="content-box">
        <p className="post-content">
          这是一条有意思的贴子这是一条有意思的贴子这是一条有意思的贴子这是一条有意思的贴子这是一条有意思的贴子这是一条有意思的贴子这是一条有意思的贴子这是一条有意思的贴子这是一条有意思的贴子这是一条有意思的贴子这是一条有意思的贴子这是一条有意思的贴子这是一条有意思的贴子这是一条有意思的贴子这是一条有意思的贴子这是一条有意思的贴子这是一条有意思的贴子这是一条有意思的贴子这是一条有意思的贴子这是一条有意思的贴子
        </p>
      </div>
      <div className="description-box">
        <div>
          <Tag bordered={false} color="processing">
            计算机科学与技术
          </Tag>
          <Tag bordered={false} color="success">
            数据库课程
          </Tag>
        </div>
        <Divider type="vertical" />
        <div className="post-time">2023-12-01</div>
      </div>
    </div>
  );
};

const Forum: React.FC = () => {
  useEffect(() => {
    if (token) {
      getAllPostInfo(1, token).then((res) => {
        console.log(res.data.posts.content);
      });
    }
  }, []);

  return (
    <div>
      <div className="posts-wrap">
        <Post />
        <div className="post-box">
          <div className="user-box">
            <div className="user-box-name">无纸化</div>
            <div className="user-box-account">2021214115</div>
          </div>
        </div>
        <div className="post-box">
          <div className="user-box">
            <div className="user-box-name">无纸化</div>
            <div className="user-box-account">2021214115</div>
          </div>
        </div>
        <div className="post-box">
          <div className="user-box">
            <div className="user-box-name">无纸化</div>
            <div className="user-box-account">2021214115</div>
          </div>
        </div>
        <div className="post-box">
          <div className="user-box">
            <div className="user-box-name">无纸化</div>
            <div className="user-box-account">2021214115</div>
          </div>
        </div>
        <div className="post-box">
          <div className="user-box">
            <div className="user-box-name">无纸化</div>
            <div className="user-box-account">2021214115</div>
          </div>
        </div>
        <div className="post-box">
          <div className="user-box">
            <div className="user-box-name">无纸化</div>
            <div className="user-box-account">2021214115</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
