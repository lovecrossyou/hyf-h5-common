import request from '../../../utils/request';

export async function fetchClientAccount() {
  return request('/account/clientAccount',{
    method:'post'
  });
}

export async function fetchUserProfitInfo() {
  return request('/profit/userProfitInfo',{
    method:'post'
  });
}

export async function fetchUserProfitAllFriendInfo() {
  return request('/profit/userProfitAllFriendInfo',{
    method:'post'
  });
}


export async function fetchAccountInfo() {
  return request('/account/info',{
    method:'post',
    body:{}
  });
}

