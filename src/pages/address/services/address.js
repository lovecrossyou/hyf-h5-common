import request from '../../../utils/request';

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

export async function queryDel (params) {
  return request('/deliveryAddress/delete',{
    method: 'post',
    body: params,
  })
}

export async function querySetDef (params) {
  return request('/deliveryAddress/setDefault',{
    method: 'post',
    body: params,
  })
}



