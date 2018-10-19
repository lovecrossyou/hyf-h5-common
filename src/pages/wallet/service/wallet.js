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

