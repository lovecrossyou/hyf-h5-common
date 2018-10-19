export default {
  publicPath: '/xitenggamejar/dist/',
  base:'/xitenggamejar/',
  history: 'hash',
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      immer: true,
      hd: true
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
