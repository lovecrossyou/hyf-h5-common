import config from './config';

export function getAccessToken() {
  // return {"app_key":"b5958b665e0b4d8cae77d28e1ad3f521","signature":"B6DD4C930E576DE971CE7DFED9DA84D7","access_token":"1bc7af3be54949cd996a8ad8d22f755a"}
  // return {
  //   access_token:"d493f7c69397413f88d641c145d49fa4",
  //   app_key:"b5958b665e0b4d8cae77d28e1ad3f521",
  //   signature:"06CF602ECEEB68EB308111759091DF9C"
  // }
  // test
  // return {"app_key":"b5958b665e0b4d8cae77d28e1ad3f521","signature":"63FE2FE8D69F805D149E3D3029921508","access_token":"935e84d786ef44cfa8215ca18e6d2ddf"}
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




