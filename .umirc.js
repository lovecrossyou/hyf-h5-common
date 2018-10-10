export default {
  publicPath: '/',
  history: 'hash',
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      immer: true
    }],
  ],
  proxy: {
    "/api": {
      "target": "http://123.57.161.212:9939/xitenggamejar/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
}
