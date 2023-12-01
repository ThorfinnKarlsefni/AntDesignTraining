import { request } from '@umijs/max';

export async function getMenuPathList() {
  return request<MenuItem[]>('/api/menu/pathList', {
    method: 'GET',
  });
}

export async function addPermission(params: PermissionItem) {
  return request('/api/permission', {
    method: 'POST',
    data: params,
  });
}

export async function getPermissionList() {
  return request<PermissionItem[]>('/api/permission', {
    method: 'GET',
  });
}
