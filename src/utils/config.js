const isMock = true;
const baseUrlPrefix = isMock?'/api':'';
module.exports = {
  name: 'dva-umi-mobile',
  apiPrefix: baseUrlPrefix,
  openPages: ['/points/page','/login/page','/404','/productlist/page','/productlist/ProductDetail']
}
