import { request } from '@umijs/max';

export async function addRole(params: Role) {
  return request<Role>('/api/role', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeRole(roleId: string) {
  return request(`/api/role/${roleId}`, {
    method: 'DELETE',
  });
}
