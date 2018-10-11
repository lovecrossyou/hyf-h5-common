import request from '../../../utils/request';

export async function fetchClientAccount() {
  return request('/api/account/clientAccount',{
    method:'post'
  });
}

export async function fetchUserProfitInfo() {
  return request('/api/profit/userProfitInfo',{
    method:'post'
  });
}

export async function fetchUserProfitAllFriendInfo() {
  return request('/api/profit/userProfitAllFriendInfo',{
    method:'post'
  });
}


export async function fetchAccountInfo() {
  return request('/api/account/info',{
    method:'post',
    body:{}
  });
}

