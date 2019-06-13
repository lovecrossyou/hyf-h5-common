import request from '../../../utils/request';


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


export async function fetchBankCardKindListMsg() {
  return request('/client/bankCardKind/bankCardKindListMsg',{
    method:'post',
    body:{
      pageNo: 0,
      size: 6
    }
  });
}


export async function fetchCheckCode(params) {
  return request('/reqcheckCode/getCode',{
    method:'post',
    body:params
  });
}

//添加银行卡
export async function fetchAddBankCard(params) {
  return request('/client/bankCard/addBankCard',{
    method:'post',
    body:params
  });
}
