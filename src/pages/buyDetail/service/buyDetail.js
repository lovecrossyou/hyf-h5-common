import request from '../../../utils/request';

export async function purchaseInfo(params) {
  return request('/discountGame/purchaseInfo',{
    method:'post',
    body:params
  });
}
