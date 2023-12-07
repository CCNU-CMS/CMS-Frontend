// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

// 写在前面
// 接口定义采用小驼峰式命名法

/** 登录接口 POST /api/v1/user/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/v1/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 获取用户个人信息接口 /api/v1/user/info */
export async function getUserInfo(token: string) {
  return request<API.GetUserInfoResult>('api/v1/user/info', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
}

/** 选课接口 /api/v1//course/choose/{courseId} */
export async function chooseCourse(courseId: number, token: string) {
  return request<API.ChooseCourseResult>('/api/v1//course/choose/${courseId}', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
}

/** 退课接口 /api/v1/course/delete/{courseId} */
export async function dropCourse(courseId: number, token: string) {
  return request<API.DropCourseResult>(`/api/v1/course/drop/${courseId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
}

/** 获取已选择的全部课程信息接口 /api/v1/course/all/info */
export async function getAllChooseCourseInfo(params: { page: number }, token: string) {
  return request<API.GetAllChooseCourseInfoResult>('/api/v1/course/all/choose', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    params: {
      ...params,
    },
  });
}

/** 获取全部课程信息接口 /api/v1/course/all/info */
export async function getAllCourseInfo(params: { page: number }, token: string) {
  return request<API.GetAllCourseInfoResult>('/api/v1/course/all/info', {
    method: 'GET',
    headers: {
      'Content-Type': 'application.json',
      Authorization: token,
    },
    params: {
      ...params,
    },
  });
}
// 以下是框架自带接口，可以忽略

// /** 获取规则列表 GET /api/rule */
// export async function rule(
//   params: {
//     // query
//     /** 当前的页码 */
//     current?: number;
//     /** 页面的容量 */
//     pageSize?: number;
//   },
//   options?: { [key: string]: any },
// ) {
//   return request<API.RuleList>('/api/rule', {
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }

// /** 新建规则 PUT /api/rule */
// export async function updateRule(options?: { [key: string]: any }) {
//   return request<API.RuleListItem>('/api/rule', {
//     method: 'PUT',
//     ...(options || {}),
//   });
// }

// /** 新建规则 POST /api/rule */
// export async function addRule(options?: { [key: string]: any }) {
//   return request<API.RuleListItem>('/api/rule', {
//     method: 'POST',
//     ...(options || {}),
//   });
// }

// /** 删除规则 DELETE /api/rule */
// export async function removeRule(options?: { [key: string]: any }) {
//   return request<Record<string, any>>('/api/rule', {
//     method: 'DELETE',
//     ...(options || {}),
//   });
// }
