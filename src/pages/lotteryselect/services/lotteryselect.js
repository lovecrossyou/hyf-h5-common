import request from '../../../utils/request';

export async function queryCreateOrder (params) {
  return request('/zeroDiscount/createOrder',{
    method: 'post',
    body: params,
  })
}



