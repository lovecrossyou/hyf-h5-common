import config from './config';

export function getAccessToken() {
  // if (config.isMock) return {"app_key":"b5958b665e0b4d8cae77d28e1ad3f521","signature":"D4D6D65A79E72A793B25A572C77B9191","access_token":"b649b1c01f0f467db6c3e80c7e9cf339"};
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



