export function getAccessToken() {
  // const token = localStorage.getItem('accessToken') ;
  // return token===undefined? '' : token ;

  return {
    "app_key":"b5958b665e0b4d8cae77d28e1ad3f521",
    "signature":"90D6C00F51006BFCF3B1A02B810C1A22",
    "access_token":"c9ffec5aad484d86ac73d2268dc0ff7e",
    "os":"WeixinMiniProgramPay"
  }

  return {
    'app_key': 'b5958b665e0b4d8cae77d28e1ad3f521',
    'access_token': 'd634b139ba4141dda0430dbd6b7c0086',
    'access_secret': '0efef7b1bd3b4abea99fc7abcdafb96f',
  };

}

export function setAccessToken(authority) {
  return localStorage.setItem('accessToken', authority);
}
