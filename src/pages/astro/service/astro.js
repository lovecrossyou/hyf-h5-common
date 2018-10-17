import request from '../../../utils/request';

export async function fetchAstroInfo() {
  return request('/api/vip/userVipInfo',{
    method:'post',
    body:{}
  });
}
