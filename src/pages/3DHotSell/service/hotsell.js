import request from '../../../utils/request';

export async function querySpecProduct (params) {
  return request('/discountGameList/byTimeLimitChoice',{
    method: 'post',
    body: params,
  })
}


