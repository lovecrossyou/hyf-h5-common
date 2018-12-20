export default {
  history: 'hash',
  targets:{
    android: 6,
    ios: 7,
  },
  outputPath:'../node-study/views',
  publicPath:'./',
  base:'/xitenggamenode/',
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      immer: true,
      hd: true,
    }],
  ],
  proxy: {
    "/api": {
      target: "https://www.xiteng.com/xitenggamejar/",
      changeOrigin: true,
      secure: false,
      pathRewrite: { "^/api" : "" }
    }
  },
}
