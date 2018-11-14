import request from '../../../utils/request';

export async function queryWinGameListByStageDetail (params) {
  return request('/discountGame/winGameListByStageDetail',{
    method: 'post',
    body: params,
  })
}
