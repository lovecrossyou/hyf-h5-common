import config from './config';

export function getAccessToken() {

  // return {
  //   "app_key":"b5958b665e0b4d8cae77d28e1ad3f521",
  //   "signature":"9BAE6990D1245F70D8C8907C117FB2B4",
  //   "access_token":"f5b032a31ea0493aa2305c824c930d7d"
  // }

  // return {
  //   access_token:"d493f7c69397413f88d641c145d49fa4",
  //   app_key:"b5958b665e0b4d8cae77d28e1ad3f521",
  //   signature:"06CF602ECEEB68EB308111759091DF9C"
  // }
  // return {"app_key":"b5958b665e0b4d8cae77d28e1ad3f521","signature":"0D0FE095B0455C2998D8F04E0BB941AE","access_token":"dd9bc87092ed4f8eb6082a6feae5d1bd"};
  // if (config.isMock) return {"app_key":"b5958b665e0b4d8cae77d28e1ad3f521","signature":"DED3C42D70A5CC42F72321EA74333F5B","access_token":"f3f278f130764db6b18e1387f9cec644"}
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




