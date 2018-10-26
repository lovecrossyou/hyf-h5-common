import config from './config';

export function getAccessToken() {
  if (config.isMock) return {"app_key":"b5958b665e0b4d8cae77d28e1ad3f521","signature":"10D1C6BE9CB2E1DF69FCFA9F49CB90E2","access_token":"68fef30df069465b8a4efac048f57b4c"}
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



