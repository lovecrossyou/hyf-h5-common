import request from '../../../utils/request';

export async function queryCreateOrder (params) {
  return request('/zeroDiscount/createOrder',{
    method: 'post',
    body: params,
  })
}

export async function queryParticipate (params) {
  return request('/zeroDiscount/participate',{
    method: 'post',
    body: params,
  })
}

export async function queryClientOrderDetailByPlatform (params) {
  return request('/discountGameOrder/clientOrderDetail',{
    method: 'post',
    body: params,
  })
}

export async function querySetCode (params) {
  return request('/zeroDiscount/setLuckyCode',{
    method: 'post',
    body: params,
  })
}

