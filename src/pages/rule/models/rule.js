const zeroUrl = 'http://qnimage.xiteng.com/rule_003.jpg';
const threedUrl = 'http://qnimage.xiteng.com/threed.jpg';
const commonUrl = 'http://qnimage.xiteng.com/index_rule.jpg';


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
      if(type === 'openByZero'){
        return {
          ...state,
          page_src:zeroUrl
        }
      }
      if(type === 'openByTime'){
        return {
          ...state,
          page_src:threedUrl
        }
      }
      return state;
    },
  },
};
