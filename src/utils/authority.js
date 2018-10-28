import config from './config';

export function getAccessToken() {
  if (config.isMock) return {"app_key":"b5958b665e0b4d8cae77d28e1ad3f521","signature":"812001DFE735B3011EDAC7277C4213E5","access_token":"2b6212526d4c47ba86f47634d7e3c50c"}
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



