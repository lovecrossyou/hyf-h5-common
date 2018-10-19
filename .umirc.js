export default {
  history: 'hash',
  publicPath:'./',
  // publicPath:'/xitenggamejar/dist/',
  // base:'/xitenggamejar/',
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      immer: true,
      hd: true
    }],
  ],
}
