export default {
  publicPath: '/',
  history: 'hash',
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      immer: true,
<<<<<<< HEAD
      hd: true
=======
      hd:true,
>>>>>>> 1b9795b60670e37ba28d0d8286edf98878c11de5
    }],
  ],
  proxy: {
    "/api": {
      // "target": "http://192.168.1.83:9939/xitenggamejar/",
      "target": "http://123.57.161.212:9939/xitenggamejar/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
}
