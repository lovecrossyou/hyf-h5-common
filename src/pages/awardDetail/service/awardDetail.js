import request from '../../../utils/request';

export async function queryWinGameListByStageDetail (params) {
  return request('/discountGame/winGameListByStageDetail',{
    method: 'post',
    body: params,
  })
}

export async function queryInviteUserRank(params) {
  return request('/discountGame/inviteUserRank',{
    method: 'post',
    body: params,
  })
}

export async function queryPurchaseRank(params) {
  return request('/discountGame/purchaseRank',{
    method: 'post',
    body: params,
  })
}
