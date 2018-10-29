/**
 * Created by zhulizhe on 2018/10/28.
 */
import request from '../../../utils/request';
var QRCode = require('qrcode')

export async function fetchAstroInfo() {
  return request('/vip/userVipInfo',{
    method:'post',
    body:{}
  });
}

// 获取用户信息 /user/info
export async function queryUserInfo() {
  return request('/user/info',{
    method:'post',
    body:{}
  });
}


// "constellation": "string",
//   "sex": 0
// /user/modify/constellation
// 设置星座 性别
export async function queryModifyConstellation(params) {
  return request('/user/modify/constellation',{
    method:'post',
    body:params
  });
}


// 星座详情
export async function queryConstellationDetail(params) {
  return request('/constellation/detail',{
    method:'post',
    body:params
  });
}


export async function generateQRCode(text) {
  return QRCode.toDataURL(text)
    .then(url => url)
    .catch(err => {
      console.error(err)
    })
}
