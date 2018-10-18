import request from '../../../utils/request';

export async function fetchAstroInfo() {
  return request('/vip/userVipInfo',{
    method:'post',
    body:{}
  });
}
