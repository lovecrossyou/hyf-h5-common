/**
 *日期: 2019-02-01
 *作者: lovecross
 *功能:
 */
import fetch from 'dva/fetch';

const BaseUrl = (url) => {
  return "/h5" + url;
}

const request = async (url, options, type='json')=> {
  let opt = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: options.method,
  };
  const response = await fetch(BaseUrl(url), opt);
  if (type !== 'json') return response.text();
  return response.json();
}


export async function fetchActiveInfo() {
  return request('/activityInfo',{
    method:'get',
  });
}
