import request from '../../../utils/request';

export async function fetchUserVipInfo() {
  return request('/api/vip/userVipInfo',{
    method:'post',
    body:{}
  });
}

export async function fetchUpdateToVipUser(payload) {
  return request('/api/vip/updateToVipUser',{
    method:'post',
    body:payload
  });
}
