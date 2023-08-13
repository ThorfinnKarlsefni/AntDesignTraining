import { request } from '@umijs/max';
import { TableListItem } from './data';

/**
 * 收获开票
 * @param params
 * @returns
 */
export async function submitInvoice(params: TableListItem) {
  return request<Record<string, any>>('/api/invoice', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function getShipperInfo(params: string) {
  return request('/api/Shipper', {
    method: 'GET',
    params: {
      phone: params,
    },
  });
}
