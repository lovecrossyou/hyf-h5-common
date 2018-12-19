export default {
  history: 'hash',
  targets:{
    ios:7
  },
  outputPath:'/home/xituser/node-server/node-study/views',
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
      // "target": "http://192.168.1.83:9939/xitenggamejar/",
      target: "https://www.xiteng.com/xitenggamejar/",
      changeOrigin: true,
      secure: false,
      pathRewrite: { "^/api" : "" }
    }
  },
}
