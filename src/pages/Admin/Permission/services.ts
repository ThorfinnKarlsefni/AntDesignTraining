import { request } from '@umijs/max';

export async function getMenuPathList() {
  return request<PathOptions[]>('/api/menu/permission/menus', {
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

export async function dragSort(params?: any) {
  return request('/api/permission/drag', {
    method: 'PUT',
    data: {
      afterIndex: params.afterIndex,
      beforeIndex: params.beforeIndex,
      newDataSource: params.newDataSource,
    },
  });
}
