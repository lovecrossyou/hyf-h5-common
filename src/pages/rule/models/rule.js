import { fetchActiveInfo } from '../service';

const zeroUrl = 'http://qnimage.xiteng.com/%E8%A7%84%E5%88%99-%E6%8A%BD%E7%AD%BE%E6%8A%A2.jpg';
const threedUrl = 'http://qnimage.xiteng.com/three_d_rule.jpg';
const commonUrl = 'http://qnimage.xiteng.com/%E5%96%9C%E8%85%BE%E6%8A%A2%E8%B4%AD%E6%B4%BB%E5%8A%A8%E8%A7%84%E5%88%99.jpg';


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

          dispatch({
            type:'fetchRuleInfo'
          })
        }
      });
    },
  },
  effects: {
    * fetchRuleInfo({ payload }, { call, put }) {
      const activeInfo = yield call(fetchActiveInfo);
      yield put({
        type: 'save', payload: {
          activeInfo: activeInfo.rule,
        },
      });
    },
  },
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
