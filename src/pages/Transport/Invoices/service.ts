import { request } from '@umijs/max';
import { InvoicesItem } from './data';

/**
 * 收获开票
 * @param params
 * @returns
 */
export async function addInvoice(params: InvoicesItem) {
  return request<Record<string, any>>('/api/invoice', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function getShipperList(params: string) {
  return request('/api/ShipperList', {
    method: 'POST',
    params: {
      phone: params,
    },
  });
}

export async function getConsigneeList(params: string) {
  return request('/api/ConsigneeList', {
    method: 'POST',
    params: {
      phone: params,
    },
  });
}
