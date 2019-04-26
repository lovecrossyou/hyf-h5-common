import request from '../../../utils/request';

export async function fetchClientAccount() {
  return request('/account/clientAccount',{
    method:'post',
    body:{}
  });
}

export async function fetchUserProfitInfo() {
  return request('/profit/userProfitInfo',{
    method:'post',
    body:{}
  });
}

export async function fetchUserProfitAllFriendInfo() {
  return request('/profit/userProfitAllFriendInfo',{
    method:'post',
    body:{}
  });
}


export async function fetchAccountInfo() {
  return request('/account/info',{
    method:'post',
    body:{}
  });
}

//邀请红包奖励
export async function fetchInviteProfitXtb() {
  return request('/profit/InviteProfitXtb',{
    method:'post',
    body:{}
  });
}

//会员奖励
export async function fetchShareSellProfitRmb() {
  return request('/profit/shareSellProfitRmb',{
    method:'post',
    body:{}
  });
}

// 获取用户的钻石好友
export async function fetchUserProfitDiamondFriendInfo(params) {
  return request('/profit/userProfitDiamondFriendInfo',{
    method:'post',
    body:params
  });
}

// 账单明细
export async function fetchBill(params) {
  return request('/account/bill',{
    method:'post',
    body:params
  });
}

// 用户绑定的银行卡列表
export async function fetchBankCardList() {
  return request('/client/bankCard/bankCardList',{
    method:'post',
    body:{
      pageNo: 0,
      size: 6
    }
  });
}

// 提现
export async function fetchWithdraw(params) {
  return request('/discountGame/withdraw',{
    method:'post',
    body:{
      bankCardId:11111111111,
      mount:11,
      payPassword:"111111",
      type:"refundRmbWithDraw "
    }
  });
}




