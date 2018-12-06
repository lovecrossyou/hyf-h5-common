import config from './config';

export function getAccessToken() {
  return {"app_key":"b5958b665e0b4d8cae77d28e1ad3f521","signature":"BD60133D4A74C4926FD592E8DD85BE94","access_token":"3550f4cf636a48d3b91417cbca29f851"}
  return {
    access_token:"d493f7c69397413f88d641c145d49fa4",
    app_key:"b5958b665e0b4d8cae77d28e1ad3f521",
    signature:"06CF602ECEEB68EB308111759091DF9C"
  }
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




