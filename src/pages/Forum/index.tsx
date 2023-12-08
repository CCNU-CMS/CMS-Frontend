import { getAllPostInfo } from '@/services/ant-design-pro/api';
import { history } from '@umijs/max';
import { Divider, Tag } from 'antd';
import { useEffect, useState } from 'react';
import addicon from '../../../public/icons/addicon.png';
import './index.less';

const token = localStorage.getItem('token');

type PostProp = {
  post: API.PostInfo;
};

const Post: React.FC<PostProp> = (props: PostProp) => {
  const { user, content, createdAt, tags, id } = props.post;

  const handleClick = () => {
    history.push(`/forum/post?id=${id}`);
  };

  return (
    <div className="post-box" onClick={handleClick}>
      <div className="user-box">
        <div className="user-box-name">{user.name}</div>
        <div className="user-box-account">{user.account}</div>
      </div>
      <div className="content-box">
        <p className="post-content">{content}</p>
      </div>
      <div className="description-box">
        <div>
          {tags.map((tag) => {
            return (
              <Tag
                key={tag.id}
                bordered={false}
                color={tag.type === 1 ? 'blue-inverse' : 'green-inverse'}
                style={{
                  fontSize: '14px',
                }}
              >
                {tag.name}
              </Tag>
            );
          })}
        </div>
        <Divider type="vertical" />
        <div className="post-time">{createdAt.split('T')[0]}</div>
      </div>
    </div>
  );
};

const Forum: React.FC = () => {
  const [posts, setPosts] = useState<API.PostInfo[]>([]);

  useEffect(() => {
    if (token) {
      getAllPostInfo(1, token).then((res) => {
        setPosts(res.data.posts.content);
        console.log(res.data.posts.content);
      });
    }
  }, []);

  const toPostAdd = () => {
    history.push('/forum/post/add');
  };

  return (
    <div className="forum-wrap">
      <div className="posts-wrap">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <div className="addicon-wrap" onClick={toPostAdd}>
        <img src={addicon} alt="" />
      </div>
    </div>
  );
};

export default Forum;
