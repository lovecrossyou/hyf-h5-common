import request from '../../../utils/request';
import config from '../../../utils/config';

const { api } = config
export async function queryAddress (params) {
  return request({
    url: '/api/addresslist',
    method: 'post',
    data: params,
  })
}
