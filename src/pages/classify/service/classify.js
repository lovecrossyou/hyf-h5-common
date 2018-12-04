import request from '../../../utils/request';

export async function fetchFirstCategory() {
  return request('/discountProduct/firstCategory',{
    method:'post',
    body:{}
  });
}

export async function fetchSecondCategory(params) {
  return request('/discountProduct/secondCategory',{
    method:'post',
    body:params
  });
}

export async function productOfSecondCategory(params) {
  return request('/discountProduct/productOfSecondCategory',{
    method:'post',
    body:params
  });
}
