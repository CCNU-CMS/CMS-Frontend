import { deleteComment, getPost, getUserInfo, makeComment } from '@/services/ant-design-pro/api';
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

type CommentProp = {
  postId: number;
};

const Comment: React.FC<CommentProp> = (props: CommentProp) => {
  const { postId } = props;
  const [content, setContent] = useState('');
  const [parentCommentId, setParentCommentId] = useState(0);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: -1,
    name: '',
    account: '',
    sex: '',
    dept: '',
    identity: -1,
  });

  useEffect(() => {
    if (token) {
      getUserInfo(token).then((res) => {
        setUserInfo(res.data);
      });
    }
  }, []);

  const showCommentInput = () => {
    setParentCommentId(1);
  };

  const cancleCommentInput = () => {
    setParentCommentId(0);
  };

  const submit = () => {
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
            } else {
              message.error('删除评论失败，请重试！');
            }
          });
        }
      },
      onCancel() {},
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="comments-box">
      <div className="text-box">
        <TextArea
          // showCount
          // maxLength={300}
          // bordered={false}
          onChange={onChange}
          placeholder="发表自己的看法"
          style={{ height: 150, resize: 'none', width: '100%' }}
        />
        <div className="submit-btn-box">
          <Button onClick={submit}>发送</Button>
        </div>
      </div>
      <div className="comments-list">
        <div className="comment-item-box">
          <div className="comment-user-box">
            <div className="from-user-name">无纸化</div>
            {/* <div className="to-user-name">{'回复 吴梓煌: '}</div> */}
          </div>
          <div className="comment-content-box">
            <p className="comment-content">
              真的太棒了，必须为你点赞,真的太棒了，必须为你点赞,真的太棒了，必须为你点赞,真的太棒了，必须为你点赞,真的太棒了，必须为你点赞,真的太棒了，必须为你点赞
            </p>
          </div>
          <div className="comment-description-box">
            <div className="comment-time-box">2023-12-08</div>
            <div className="comment-add-btn" onClick={showCommentInput}>
              <img src={commenticon} alt="" />
            </div>
            <div className="comment-delete-btn" onClick={() => handleDelete(0)}>
              <img src={deleteicon} alt="" />
            </div>
          </div>
          {parentCommentId !== 0 && (
            <div className="internal-text-box">
              <TextArea
                // showCount
                // maxLength={300}
                // bordered={false}
                onChange={onChange}
                placeholder="发表自己的看法"
                style={{ height: 150, resize: 'none', width: '100%' }}
              />
              <div className="internal-text-btn-box">
                <Button onClick={cancleCommentInput}>取消</Button>
                <Button onClick={submit}>发送</Button>
              </div>
            </div>
          )}
        </div>

        <div className="comment-item-box">
          <div className="comment-user-box">
            <div className="from-user-name">无纸化</div>
            <div className="to-user-name">{'回复 吴梓煌: '}</div>
          </div>
          <div className="comment-content-box">
            <p className="comment-content">真的太棒了，必须为你点赞</p>
          </div>
          <div className="comment-description-box">
            <div className="comment-time-box">2023-12-08</div>
          </div>
        </div>
        <div className="comment-item-box">
          <div className="comment-user-box">
            <div className="from-user-name">无纸化</div>
            <div className="to-user-name">{'回复 吴梓煌: '}</div>
          </div>
          <div className="comment-content-box">
            <p className="comment-content">真的太棒了，必须为你点赞</p>
          </div>
          <div className="comment-description-box">
            <div className="comment-time-box">2023-12-08</div>
          </div>
        </div>
        <div className="comment-item-box">
          <div className="comment-user-box">
            <div className="from-user-name">无纸化</div>
            <div className="to-user-name">{'回复 吴梓煌: '}</div>
          </div>
          <div className="comment-content-box">
            <p className="comment-content">真的太棒了，必须为你点赞</p>
          </div>
          <div className="comment-description-box">
            <div className="comment-time-box">2023-12-08</div>
          </div>
        </div>
        <div className="comment-item-box">
          <div className="comment-user-box">
            <div className="from-user-name">无纸化</div>
            <div className="to-user-name">{'回复 吴梓煌: '}</div>
          </div>
          <div className="comment-content-box">
            <p className="comment-content">真的太棒了，必须为你点赞</p>
          </div>
          <div className="comment-description-box">
            <div className="comment-time-box">2023-12-08</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostDetail: React.FC = () => {
  const location = useLocation();
  const [postId, setPostId] = useState(0);
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
    setPostId(id);
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
      <Comment postId={postId} />
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
