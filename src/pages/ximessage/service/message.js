import request from '../../../utils/request';

export async function fetchMessageList(params) {
  return request('/pushMessage/list',{
    method:'post',
    body:params
  });
}
