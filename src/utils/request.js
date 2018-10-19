import fetch from 'dva/fetch';
import { getAccessToken } from './authority';
import config from './config';


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

const BaseUrl = (url)=>{
  return config.apiPrefix + url ;
}

// const getAccessInfo = ()=>{
//   const accessToken = getAccessToken();
//   if(config.isMock)return accessToken ;
//
//   const state = window.g_app._store.getState();
//   const accessInfo = state.global.accessInfo ;
//   return accessInfo ;
// }


export default async function request(url, options) {
  const accessInfo = getAccessToken();
  const body = Object.assign(options.body || {}, { accessInfo: JSON.parse(accessInfo) });
  console.log('request ', url);
  console.log('request payload ', body);
  const opt = {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    method: options.method,
  };
  const response = await fetch(BaseUrl(url), opt);
  checkStatus(response);
  return response.json();
}
