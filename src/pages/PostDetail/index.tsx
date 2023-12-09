import {
  deleteComment,
  getComments,
  getPost,
  getUserInfo,
  makeComment,
} from '@/services/ant-design-pro/api';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { history, useLocation } from '@umijs/max';
import { Button, Divider, Input, message, Modal, Tag } from 'antd';
import { useEffect, useState } from 'react';
import commenticon from '../../../public/icons/commenticon.png';
import deleteicon from '../../../public/icons/deleteicon.png';
import './index.less';

const { confirm } = Modal;
const { TextArea } = Input;
const token = localStorage.getItem('token');

type PostProp = {
  post: API.PostInfo;
};

const Post: React.FC<PostProp> = (props: PostProp) => {
  const { user, content, createdAt, tags } = props.post;

  return (
    <div className="post-box">
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
                style={{ fontSize: '14px' }}
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

type UserInfo = {
  id: number;
  name: string;
  account: string;
  sex: string;
  dept: string;
  identity: number;
};

const Comment: React.FC = () => {
  const location = useLocation();
  const postId = Number(location.search.split('=')[1]);
  const [comments, setComments] = useState<API.CommentInfo[]>([]);
  const [content1, setContent1] = useState('');
  const [content2, setContent2] = useState('');
  const [parentCommentId, setParentCommentId] = useState(0);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: -1,
    name: '',
    account: '',
    sex: '',
    dept: '',
    identity: -1,
  });

  const updateComments = () => {
    if (token) {
      getComments(postId, token).then((res) => {
        if (res.status === 100) {
          setComments(res.data);
        }
      });
    }
  };

  useEffect(() => {
    updateComments();
    if (token) {
      getUserInfo(token).then((res) => {
        setUserInfo(res.data);
      });
    }
  }, []);

  const showCommentInput = (id: number) => {
    setParentCommentId(id);
  };

  const cancleCommentInput = () => {
    setParentCommentId(0);
  };

  const submit = (content: string) => {
    if (content === '') {
      message.warning('请填写评论！');
      return;
    }

    const date = new Date();
    const commentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const data: API.MakeCommentParams = {
      postId: postId,
      account: userInfo.account,
      content: content,
      commentDate: commentDate,
      parentCommentId: parentCommentId,
    };
    console.log(data);
    if (token) {
      makeComment(data, token).then((res) => {
        if (res.status === 100) {
          message.success('评论成功!');
          setContent1('');
          setContent2('');
          setParentCommentId(0);
          updateComments();
        } else {
          message.error('评论失败，请重试！');
        }
      });
    }
  };

  const handleDelete = (id: number) => {
    confirm({
      title: '您确定要删除该评论吗?',
      icon: <ExclamationCircleFilled />,
      content: '删除后将不可恢复！',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        if (token) {
          deleteComment(id, token).then((res) => {
            if (res.status === 100) {
              message.success('删除评论成功！');
              updateComments();
            } else {
              message.error('删除评论失败，请重试！');
            }
          });
        }
      },
      onCancel() {},
    });
  };

  const onChange1 = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent1(e.target.value);
  };

  const onChange2 = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent2(e.target.value);
  };

  return (
    <div className="comments-box">
      <div className="text-box">
        <TextArea
          // showCount
          // maxLength={300}
          // bordered={false}
          value={content1}
          onFocus={() => setParentCommentId(0)}
          onChange={onChange1}
          placeholder="发表自己的看法"
          style={{ height: 150, resize: 'none', width: '100%' }}
        />
        <div className="submit-btn-box">
          <Button onClick={() => submit(content1)}>发送</Button>
        </div>
      </div>
      <div className="comments-list">
        {comments.map((comment) => {
          return (
            <div className="comment-item-box" key={comment.id}>
              <div className="comment-user-box">
                <div className="from-user-name">{comment.userName}</div>
                {comment.parentUserName !== null && (
                  <div className="to-user-name">{` 回复 ${comment.parentUserName}: `}</div>
                )}
              </div>
              <div className="comment-content-box">
                <p className="comment-content">{comment.content}</p>
              </div>
              <div className="comment-description-box">
                <div className="comment-time-box">{comment.commentDate}</div>
                <div className="comment-add-btn" onClick={() => showCommentInput(comment.id)}>
                  <img src={commenticon} alt="" />
                </div>
                {comment.userId === userInfo.id && (
                  <div className="comment-delete-btn" onClick={() => handleDelete(comment.id)}>
                    <img src={deleteicon} alt="" />
                  </div>
                )}
              </div>
              {parentCommentId === comment.id && (
                <div className="internal-text-box">
                  <TextArea
                    // showCount
                    // maxLength={300}
                    // bordered={false}
                    value={content2}
                    autoFocus
                    // onBlur={() => setParentCommentId(0)}
                    onChange={onChange2}
                    placeholder="发表自己的看法"
                    style={{ height: 150, resize: 'none', width: '100%' }}
                  />
                  <div className="internal-text-btn-box">
                    <Button onClick={cancleCommentInput}>取消</Button>
                    <Button onClick={() => submit(content2)}>发送</Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PostDetail: React.FC = () => {
  const location = useLocation();
  const [post, setPost] = useState<API.PostInfo>({
    id: -1,
    content: '',
    user: {
      id: -1,
      name: '',
      account: '',
      sex: '',
      dept: '',
      password: '',
      identity: -1,
    },
    createdAt: '',
    tags: [],
  });

  useEffect(() => {
    const id = Number(location.search.split('=')[1]);
    if (token) {
      getPost(id, token).then((res) => {
        console.log(res.data);
        setPost(res.data);
      });
    }
  }, []);

  return (
    <div className="post-detail-wrap">
      <Post post={post} />
      <Comment />
      <div
        className="back"
        onClick={() => {
          history.back();
        }}
      >
        返回
      </div>
    </div>
  );
};
export default PostDetail;
