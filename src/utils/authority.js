export function getAccessToken() {
  // const token = localStorage.getItem('accessToken') ;
  // return token===undefined? '' : token ;


  return {
    "app_key":"b5958b665e0b4d8cae77d28e1ad3f521",
    "signature":"8200E5F6853A7D633C1F4A1CEC0AC91F",
    "access_token":"5b27e0a6452b472d91ce6f646064512e",
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
