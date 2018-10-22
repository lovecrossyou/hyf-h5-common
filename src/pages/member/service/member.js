import request from '../../../utils/request';

export async function fetchUserVipInfo() {
  return request('/vip/userVipInfo',{
    method:'post',
    body:{}
  });
}

export async function fetchUpdateToVipUser(payload) {
  return request('/vip/updateToVipUser',{
    method:'post',
    body:payload
  });
}
