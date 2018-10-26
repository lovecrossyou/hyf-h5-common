import config from './config';

export function getAccessToken() {
  if (config.isMock) return {"app_key":"b5958b665e0b4d8cae77d28e1ad3f521","signature":"9DCD02E5B2C277687681BA62A3707784","access_token":"0312aff9a63d4ec48899925be2d5f1ec","os":"WeixinMiniProgramPay"}
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



