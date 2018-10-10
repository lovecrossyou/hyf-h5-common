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
      "target": "http://huipay.com/huibeiwater/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
}
