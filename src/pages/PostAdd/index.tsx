import { addPost, getTagInfo, getUserInfo } from '@/services/ant-design-pro/api';
import { history } from '@umijs/max';
import { Button, Input, message, Tag } from 'antd';
import { useEffect, useState } from 'react';
import './index.less';
const { TextArea } = Input;
const token = localStorage.getItem('token');

type UserInfo = {
  id: number;
  name: string;
  account: string;
  sex: string;
  dept: string;
  identity: number;
};

const PostAdd: React.FC = () => {
  const [academyTags, setAcademyTags] = useState<API.TagInfo[]>([]);
  const [courseTags, setCourseTags] = useState<API.TagInfo[]>([]);
  const [selectedAcademyTag, setSelectedAcademyTag] = useState<API.TagInfo>({
    id: -1,
    name: '',
    type: 0,
  });

  const [selectedCourseTag, setSelectedCourseTag] = useState<API.TagInfo>({
    id: -1,
    name: '',
    type: 0,
  });
  const [content, setContent] = useState('');
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
      getTagInfo(1, token).then((res) => {
        setAcademyTags(res.data);
      });
      getTagInfo(2, token).then((res) => {
        setCourseTags(res.data);
      });
      getUserInfo(token).then((res) => {
        setUserInfo(res.data);
      });
    }
  }, []);

  const selectAcademyTag = (tag: API.TagInfo) => {
    setSelectedAcademyTag(tag);
  };

  const selectCourseTag = (tag: API.TagInfo) => {
    setSelectedCourseTag(tag);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const submit = () => {
    if (!content || selectedAcademyTag.id === -1 || selectedCourseTag.id === -1) {
      message.warning('请将内容补充完整！');
      return;
    }
    let data: API.AddPostParams = {
      content: content,
      account: userInfo.account,
      tag_id: [selectedAcademyTag.id, selectedCourseTag.id],
    };
    if (token) {
      addPost(data, token).then((res) => {
        if (res.status === 100) {
          message.success('发布成功！');
          history.push('/forum');
        } else {
          message.error('发布失败，请重试！');
        }
      });
    }
  };

  return (
    <div className="PostAdd-wrap">
      <div className="title-box">发布贴子</div>
      <div className="academy-tags-box">
        <div className="academy-tags-title-box">专业标签:</div>
        <div className="tags-box">
          {academyTags.map((tag) => (
            <Tag
              key={tag.id}
              bordered={false}
              style={{ cursor: 'pointer', fontSize: '14px' }}
              color={selectedAcademyTag.id === tag.id ? 'blue-inverse' : ''}
              onClick={() => selectAcademyTag(tag)}
            >
              {tag.name}
            </Tag>
          ))}
        </div>
      </div>
      <div className="academy-tags-box">
        <div className="academy-tags-title-box">课程标签:</div>
        <div className="tags-box">
          {courseTags.map((tag) => (
            <Tag
              key={tag.id}
              bordered={false}
              style={{ cursor: 'pointer', fontSize: '14px' }}
              color={selectedCourseTag.id === tag.id ? 'green-inverse' : ''}
              onClick={() => selectCourseTag(tag)}
            >
              {tag.name}
            </Tag>
          ))}
        </div>
      </div>
      <div className="text-box">
        <TextArea
          showCount
          // maxLength={100}
          onChange={onChange}
          placeholder="请输入贴子内容"
          style={{ height: 150, resize: 'none', width: '100%' }}
        />
      </div>
      <div className="submit-btn-box">
        <Button onClick={submit}>发布</Button>
      </div>
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

export default PostAdd;
