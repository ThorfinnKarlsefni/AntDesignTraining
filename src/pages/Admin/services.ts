import { request } from '@umijs/max';

// 获取列表
export function getRoleList() {
  return request<Role[]>('/api/role', {
    method: 'GET',
  });
}

/** 获取全部用户 */
export async function getUserList(options?: { [key: string]: any }) {
  return request<UserList>('/api/user', {
    method: 'POST',
    ...(options || {}),
  });
}
