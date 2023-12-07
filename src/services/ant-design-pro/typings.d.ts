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
    status?: number;
    message?: string;
    data: {
      identity: number;
      token: string;
    };
    timestamp?: number;
  };

  /** 获取用户信息接口返回值类型*/
  type GetUserInfoResult = {
    status?: number;
    message?: string;
    data: {
      id: number;
      name: string;
      account: string;
      sex: string;
      dept: string;
      identity: number;
    };
    timestamp?: number;
  };

  /** 退课接口返回值类型 */
  type DropCourseResult = {
    status: number;
    message: string;
    data: string;
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
