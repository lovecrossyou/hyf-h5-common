import { setTokenFromQueryString } from '../../../utils/authority';
import { querySpecProduct } from '../service/hotsell';
export default {
  namespace: 'hotsell',
  state: {
    list:[]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/3DHotSell/page') {
          setTokenFromQueryString(query);
          dispatch({
            type: 'fetch',
          })
        }
      });
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const list = yield call(querySpecProduct,{
        pageNo:0,
        size:10
      });
      yield put({
        type: 'save',
        payload: list
      });
    },


  },
  reducers: {
    save(state,action){
      return {
        ...state,
        list:action.payload
      }
    }
  },
};
