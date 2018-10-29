import config from './config';

export function getAccessToken() {
  // if (config.isMock) return {"app_key":"b5958b665e0b4d8cae77d28e1ad3f521","signature":"1D6A766D17321532EF6021D9B0642923","access_token":"f880f13d7b524a0faf6a6518c7f09fe0"}
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



