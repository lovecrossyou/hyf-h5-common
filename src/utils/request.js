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
export default async function request(url, options) {
  console.log('request ', url);
  // const state = window.g_app._store.getState();
  // const accessInfo = state.global.accessInfo ;
  // console.log('accessInfo ',accessInfo)
  const accessToken = getAccessToken();
  // let body = Object.assign(options.body || {}, { accessInfo: JSON.parse(accessToken) });
  let body = Object.assign(options.body || {}, { accessInfo: accessToken });
  const opt = {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    method: options.method,
  };
  console.log('opt ', opt);
  const response = await fetch(url, opt);
  checkStatus(response);
  return response.json();
}
