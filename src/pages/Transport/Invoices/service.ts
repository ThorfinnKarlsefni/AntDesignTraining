import { request } from '@umijs/max';
import { InvoiceItem } from './data';

/**
 * 收获开票
 * @param params
 * @returns
 */
export async function submitInvoice(params: InvoiceItem) {
  return request<Record<string, any>>('/api/invoice', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
