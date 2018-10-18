import request from '../../../utils/request';
import config from '../../../utils/config';

export async function queryAddress (params) {
  return request('/deliveryAddress/list',{
    method: 'post',
    body: params,
  })
}


export async function queryCreate (params) {
  return request('/deliveryAddress/create',{
    method: 'post',
    body: params,
  })
}


