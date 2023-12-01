import { request } from '@umijs/max';

export async function addMenu(params: MenuItem) {
  return request('/api/menu', {
    method: 'POST',
    data: { ...params },
  });
}

export async function getMenuTree() {
  return request<MenuTree[]>('/api/menu/tree', {
    method: 'GET',
  });
}

export async function getMenu(id: number) {
  return request<MenuItem>(`/api/menu/${id}`, {
    method: 'GET',
  });
}

export async function updateMenu(id: number, menuItem: MenuItem) {
  return request(`/api/menu/${id}`, {
    method: 'PUT',
    data: { ...menuItem },
  });
}

export async function updateMenuTree(id: number, menuTreeItem: UpdateMenuTreeItem) {
  return request(`/api/menu/tree/${id}`, {
    method: 'PUT',
    data: { ...menuTreeItem },
  });
}

export async function updateMenuVisibility(id: number) {
  return request(`/api/menu/visibility/${id}`, {
    method: 'PUT',
  });
}

export async function deleteMenu(id: number) {
  return request(`/api/menu/${id}`, {
    method: 'DELETE',
  });
}
