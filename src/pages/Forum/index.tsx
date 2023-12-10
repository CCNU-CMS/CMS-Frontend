import { deletePost, getAllPostInfo, getUserInfo } from '@/services/ant-design-pro/api';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Divider, message, Modal, Tag } from 'antd';
import { useEffect, useState } from 'react';
import addicon from '../../../public/icons/addicon.png';
import deleteicon from '../../../public/icons/deleteicon.png';
import './index.less';

const { confirm } = Modal;

type UserInfo = {
  id: number;
  name: string;
  account: string;
  sex: string;
  dept: string;
  identity: number;
};

type PostProp = {
  post: API.PostInfo;
  userInfo: UserInfo;
  updatePosts: () => void;
};

const Post: React.FC<PostProp> = (props: PostProp) => {
  const token = localStorage.getItem('token');
  const { post, userInfo, updatePosts } = props;
  const { user, content, createdAt, tags, id } = post;

  const handleClick = () => {
    history.push(`/forum/post?id=${id}`);
  };

  const handleDelete = (id: number) => {
    confirm({
      title: '您确定要删除该贴子吗?',
      icon: <ExclamationCircleFilled />,
      content: '删除后将不可恢复！',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        if (token) {
          deletePost(id, token).then((res) => {
            if (res.status === 100) {
              message.success('删除贴子成功！');
              updatePosts();
            } else {
              message.error('删除贴子失败，请重试！');
            }
          });
        }
      },
      onCancel() {},
    });
  };

  return (
    <div className="post-box">
      <div className="user-box">
        <div className="user-box-name">{user.name}</div>
        <div className="user-box-account">{user.account}</div>
      </div>
      <div className="content-box" onClick={handleClick}>
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
        <Divider type="vertical" />
        {user.id === userInfo.id && (
          <div className="comment-delete-btn" onClick={() => handleDelete(post.id)}>
            <img src={deleteicon} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

const Forum: React.FC = () => {
  const token = localStorage.getItem('token');
  const [posts, setPosts] = useState<API.PostInfo[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: -1,
    name: '',
    account: '',
    sex: '',
    dept: '',
    identity: -1,
  });

  const updatePosts = () => {
    if (token) {
      getAllPostInfo(1, token).then((res) => {
        setPosts(res.data.posts.content);
        console.log(res.data.posts.content);
      });
    }
  };

  useEffect(() => {
    updatePosts();
    if (token) {
      getUserInfo(token).then((res) => {
        setUserInfo(res.data);
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
          <Post key={post.id} post={post} userInfo={userInfo} updatePosts={updatePosts} />
        ))}
      </div>
      <div className="addicon-wrap" onClick={toPostAdd}>
        <img src={addicon} alt="" />
      </div>
    </div>
  );
};

export default Forum;
