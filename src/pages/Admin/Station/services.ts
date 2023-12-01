import { request } from '@umijs/max';

export async function getToStation() {
  return request('api/ToStationList', {
    method: 'POST',
  });
}
