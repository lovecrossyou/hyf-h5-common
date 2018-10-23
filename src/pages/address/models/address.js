import { queryAddress, queryCreate } from '../services/address';
import { setTokenFromQueryString } from '../../../utils/authority';

export default {
  namespace: 'address',
  state: {
    list: [],
    activeAddress:null
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/address/page') {
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
      const list = yield call(queryAddress,{
        pageNo:0,
        size:10
      });
      yield put({
        type: 'save',
        payload: list.content
      });
    },

    *create({ payload ,cb}, { call, put }) {
      const res = yield call(queryCreate,payload);
      cb&&cb();
    },


    *delete({ payload }, { call, put }) {
      yield put({
        type: 'save', payload: {
          list: []
        }
      });
    },

  },
  reducers: {
    save(state, action) {
      return { ...state, list:action.payload };
    },

    setActive(state,action){
      return { ...state, activeAddress:action.payload };

    }
  },
};
