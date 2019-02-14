import fetch from 'dva/fetch';
import {getAccessToken} from './authority';
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

const BaseUrl = (url) => {
  return config.apiPrefix + url;
}


export default async function request(url, options, type='json') {
  const accessInfo = getAccessToken();
  const body = Object.assign(options.body || {}, {accessInfo: accessInfo});
  console.log('request ', url);
  console.log('request payload ', body);
  let opt = {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    method: options.method,
  };
  const response = await fetch(BaseUrl(url), opt);
  if (type !== 'json') return response.text();
  return response.json();
}
