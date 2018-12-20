export default {
  history: 'hash',
  targets:{
    ios:7
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
      // target: "http://123.57.161.212:9939/xitenggamejar/",
      target: "https://www.xiteng.com/xitenggamejar/",
      changeOrigin: true,
      secure: false,
      pathRewrite: { "^/api" : "" }
    }
  },
}
