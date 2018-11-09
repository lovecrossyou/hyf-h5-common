const zeroUrl = 'http://pax4lf8m2.bkt.clouddn.com/rule_003.jpg';
const commonUrl = 'http://pax4lf8m2.bkt.clouddn.com/rule_004.jpg';


export default {
  namespace: 'rule',
  state: {
    page_src: commonUrl //页面图片
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/rule/page') {
          const { type } = query;

          console.log('type ',type);
          if (type) {
            dispatch({
              type: 'save',
              payload: type,
            });
          }
        }
      });
    },
  },
  effects: {},
  reducers: {
    save(state, action) {
      const type = action.payload;
      return { ...state, userVipInfo: action.payload };
    },
  },
};
