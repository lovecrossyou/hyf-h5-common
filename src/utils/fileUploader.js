// var qiniu = require('qiniu-js') ;
//
// var config = {
//   useCdnDomain: true,
//   region: qiniu.region.z2
// };
//
// var putExtra = {
//   fname: "",
//   params: {},
//   mimeType: [] || null
// };
//
//
// var observable = qiniu.upload(file, key, token, putExtra, config)
//
// var subscription = observable.subscribe(observer) // 上传开始
// // or
// var subscription = observable.subscribe(next, error, complete) // 这样传参形式也可以
//
// subscription.unsubscribe() // 上传取消
//
//
