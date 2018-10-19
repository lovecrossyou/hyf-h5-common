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

const getAccessInfo = ()=>{
  const accessToken = getAccessToken();
  const state = window.g_app._store.getState();
  const accessInfo = state.global.accessInfo ;
  if(config.isMock)return accessToken ;
  return accessInfo ;
}


export default async function request(url, options) {
  const accessInfo = getAccessInfo();
  console.log('request ', url);
  console.log('options ', options);
  let body = Object.assign(options.body || {}, { accessInfo: accessInfo });
  console.log('body ', body);
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
