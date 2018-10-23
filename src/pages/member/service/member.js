import request from '../../../utils/request';

export async function fetchUserVipInfo() {
  return request('/vip/userVipInfo',{
    method:'post',
    body:{}
  });
}

export async function fetchUpdateToVipUser(payload) {
  return request('/vip/updateToVipUser',{
    method:'post',
    body:payload
  });
}

// 支付结果查询

export async function fetchPayResult(parmas) {
  return request('/client/discountGamePay/queryResult',{
    method:'post',
    body:parmas
  });
}
