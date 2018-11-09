import request from '../../../utils/request';

export async function querySpecProduct (params) {
  return request('/discountGameList/byTimeLimit',{
    method: 'post',
    body: params,
  })
}


