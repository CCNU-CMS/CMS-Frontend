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

/** 获取所有类型用户信息接口 /api/v1/user/all */
export async function getAllUserInfo(
  params: {
    /**当前页面的页码 */
    page: number;
    /**用户类别 */
    identity: number;
  },
  token: string,
) {
  return request<API.GetAllUserInfoResult>('/api/v1/user/all', {
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

/** 获取一种类型所有用户信息接口 /api/v1/user/all */
export async function getOneTyUserInfo(
  params: {
    /**当前页面的页码 */
    page: number;
    /**用户类别 */
    identity: number;
  },
  token: string,
) {
  return request<API.GetOneTypeUserInfoResult>('/api/v1/user/all', {
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

/** 新增用户接口 /api/v1/user/ */
export async function addUser(body: API.AddUserParams, token: string) {
  return request<API.AddUserResult>('/api/v1/user/admin/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    data: body,
  });
}

/** 删除用户接口 /api/v1/user/admin */
export async function deleteUser(body: { account: string }, token: string) {
  return request<API.DeleteUserResult>('/api/v1/user/admin', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    },
    data: body,
  });
}

/** 获取全部课程信息接口 /api/v1/course/all/info */
export async function getAllCourseInfo(params: { page: number }, token: string) {
  return request<API.GetAllCourseInfoResult>('/api/v1/course/all/info', {
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

/** 新增课程接口 /api/v1/course/new */
export async function addCourse(body: API.AddCourseParams, token: string) {
  return request<API.AddCourseResult>('/api/v1/course/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    data: body,
  });
}

/** 更改课程信息接口 /api/v1/course/update/{courseId} */
export async function updateCourse(courseId: number, body: API.UpdateCourseParams, token: string) {
  return request<API.UpdateCourseResult>(`/api/v1/course/update/${courseId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    data: body,
  });
}

/** 删除课程接口 /api/v1/course/delete/{courseId} */
export async function deleteCourse(courseId: number, token: string) {
  return request<API.DeleteCourseResult>(`/api/v1/course/delete/${courseId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
}

/** 获取全部贴子信息接口 /api/v1/post/getAllPosts/{page} */
export async function getAllPostInfo(page: number, token: string) {
  return request<API.GetAllPostResult>(`/api/v1/post/getAllPosts/${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
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
