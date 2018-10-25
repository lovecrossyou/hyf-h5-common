import config from './config';

export function getAccessToken() {
  // if (config.isMock) return {
  //   app_key: 'b5958b665e0b4d8cae77d28e1ad3f521',
  //   signature: '4BC20304F8E32ECC5AA8DEF81ADACC0F',
  //   access_token: '0226eabaad854fb7b8d503fcd8fe4e27',
  // };
  return JSON.parse(localStorage.getItem('accessToken'));
}

function setAccessToken(authority) {
  return localStorage.setItem('accessToken', JSON.stringify(authority));
}

export function setTokenFromQueryString(query) {
  const { app_key, signature, access_token } = query;
  if (app_key !== undefined) {
    let token_real = access_token.split('#')[0];
    const accessInfo = { app_key, signature, access_token: token_real };
    setAccessToken(accessInfo);
  }
}



