const awardUrl = 'http://pax4lf8m2.bkt.clouddn.com/award_detail.png';


export default {
  namespace: 'award',
  state: {
    page_src: awardUrl //页面图片
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/rule/page') {
        }
      });
    },
  },
  effects: {},
  reducers: {},
};
