// @ts-ignore
/* eslint-disable */

// 写在前面
// 类型声明采用大驼峰式命名法
declare namespace API {
  /** 登录接口body参数类型 */
  type LoginParams = {
    account?: string;
    password?: string;
  };

  /** 登录接口返回值类型*/
  type LoginResult = {
    status: number;
    message: string;
    data: {
      identity: number;
      token: string;
    };
    timestamp: number;
  };

  /** 获取用户信息接口返回值类型*/
  type GetUserInfoResult = {
    status: number;
    message: string;
    data: {
      id: number;
      name: string;
      account: string;
      sex: string;
      dept: string;
      identity: number;
    };
    timestamp: number;
  };

  /** 用户所有信息类型 */
  type DetailUserInfo = {
    id: number;
    name: string;
    account: string;
    password: string;
    sex: string;
    dept: string;
    identity: number;
  };

  /** 获取所有类型用户信息接口的返回值类型*/
  type GetAllUserInfoResult = {
    status: number;
    message: string;
    data: {
      size: number;
      users: {
        content: DetailUserInfo[];
      };
    };
    timestamp: number;
  };

  /** 获取一种类型所有用户信息接口的返回值类型*/
  type GetOneTypeUserInfoResult = {
    status: number;
    message: string;
    data: {
      size: number;
      users: DetailUserInfo[];
    };
    timestamp: number;
  };

  /** 新增用户接口body参数类型 */
  type AddUserParams = {
    name: string;
    account: string;
    password: string;
    identity: number;
  };

  /** 新增用户接口返回值类型 */
  type AddUserResult = {
    status: number;
    message: string;
    data: {
      'user-id': number;
      token: string;
    };
    timestamp: number;
  };

  /** 删除用户接口返回值类型 */
  type DeleteUserResult = {
    status: number;
    message: string;
    data?: string;
    timestamp: number;
  };

  /** 课程信息类型 */
  type CourseInfo = {
    id: number;
    name: string;
    time: string;
    classroom: string;
    academy: string;
    dept: string;
    description: string;
    teacher: string;
  };
  /** 获取全部课程信息接口的返回值类型 */
  type GetAllCourseInfoResult = {
    status: number;
    message: string;
    data: {
      courses: CourseInfo[];
      size: number;
    };
    timestamp: number;
  };

  /** 添加课程接口body参数类型 */
  type AddCourseParams = {
    name: string;
    time: string;
    classroom: string;
    academy: string;
    dept: string;
    description: string;
    t_account: string;
  };

  /** 添加课程接口返回值类型 */
  type AddCourseResult = {
    status: number;
    message: string;
    data: string;
    timestamp: number;
  };

  /** 更新课程信息接口body参数类型 */
  type UpdateCourseParams = {
    name: string;
    time: string;
    classroom: string;
    academy: string;
    dept: string;
    description: string;
  };

  /** 更新课程接口返回值类型 */
  type UpdateCourseResult = {
    status: number;
    message: string;
    data: string;
    timestamp: number;
  };

  /** 删除课程接口返回值类型 */
  type DeleteCourseResult = {
    status: number;
    message: string;
    data: string;
    timestamp: number;
  };

  /** 贴子标签类型 */
  type Tag = {
    id: number;
    name: string;
    type: number;
  };

  /** 贴子信息类型 */
  type PostInfo = {
    id: number;
    content: string;
    createdAt: string;
    user: DetailUserInfo;
    tags: Tag[];
  };

  /** 获取全部贴子接口返回值类型 */
  type GetAllPostResult = {
    status: number;
    message: string;
    data: {
      size: number;
      posts: {
        content: PostInfo[];
      };
    };
    timestamp: number;
  };

  // type PageParams = {
  //   current?: number;
  //   pageSize?: number;
  // };

  // type RuleListItem = {
  //   key?: number;
  //   disabled?: boolean;
  //   href?: string;
  //   avatar?: string;
  //   name?: string;
  //   owner?: string;
  //   desc?: string;
  //   callNo?: number;
  //   status?: number;
  //   updatedAt?: string;
  //   createdAt?: string;
  //   progress?: number;
  // };

  // type RuleList = {
  //   data?: RuleListItem[];
  //   /** 列表的内容总数 */
  //   total?: number;
  //   success?: boolean;
  // };

  // type FakeCaptcha = {
  //   code?: number;
  //   status?: string;
  // };

  // type ErrorResponse = {
  //   /** 业务约定的错误码 */
  //   errorCode: string;
  //   /** 业务上的错误信息 */
  //   errorMessage?: string;
  //   /** 业务上的请求是否成功 */
  //   success?: boolean;
  // };

  // type NoticeIconList = {
  //   data?: NoticeIconItem[];
  //   /** 列表的内容总数 */
  //   total?: number;
  //   success?: boolean;
  // };

  // type NoticeIconItemType = 'notification' | 'message' | 'event';

  // type NoticeIconItem = {
  //   id?: string;
  //   extra?: string;
  //   key?: string;
  //   read?: boolean;
  //   avatar?: string;
  //   title?: string;
  //   status?: string;
  //   datetime?: string;
  //   description?: string;
  //   type?: NoticeIconItemType;
  // };
}
