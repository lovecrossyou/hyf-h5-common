import request from '../../../utils/request';

export async function fetchBankCardKindListMsg() {
  return request('/client/bankCardKind/bankCardKindListMsg',{
    method:'post',
    body:{
      pageNo: 0,
      size: 6
    }
  });
}


export async function fetchGetCode(params) {
  return request('/reqcheckCode/getCode',{
    method:'post',
    body:params
  });
}
