import { request } from '@umijs/max';

/**
 * 收获开票
 * @param params
 * @returns
 */
export async function submitInvoice(params: any) {
  return request('/api/invoices', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
