export function getAccessToken() {
  // const token = localStorage.getItem('accessToken') ;
  // return token===undefined? '' : token ;
  return {
    'app_key': 'b5958b665e0b4d8cae77d28e1ad3f521',
    'signature': 'F26BF643B2905A49A3850BACB51C04CD',
    'access_token': '2fda2caad5d74653b763ed8f078c4c95',
    'os': 'WeixinMiniProgramPay',
  };
}

export function setAccessToken(authority) {
  return localStorage.setItem('accessToken', authority);
}
