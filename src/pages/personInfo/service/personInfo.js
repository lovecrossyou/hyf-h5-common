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

// 获取活动信息
export async function queryActiveInfo() {

  const url = 'https://www.xiteng.com/xitenggamenode/activityInfo' ;
  const opt = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    method:'GET'
  };
  const response = await fetch(url, opt);
  return response.json();
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

// 设置名字
export async function modifyName(params) {
  return request('/user/modify/name',{
    method:'post',
    body:params
  });
}



// 修改头像
export async function modifyIcon(params) {
  return request('/user/modify/icon',{
    method:'post',
    body:params
  });
}
