import request from '../../../utils/request';
import config from '../../../utils/config';

export async function queryAddress (params) {
  return request('/api/deliveryAddress/list',{
    method: 'post',
    body: params,
  })
}


export async function queryCreate (params) {
  return request('/api/deliveryAddress/create',{
    method: 'post',
    body: params,
  })
}


