import { queryAddress, queryCreate } from '../services/address';

export default {
  namespace: 'address',
  state: {
    text: 'page work',
    list: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/address/page') {
          dispatch({
            type: 'fetch',
          })
          dispatch({
            type:'global/setTitle',payload:{
              text:"地址列表"
            }
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
        type: 'save', payload: list.content
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
  },
};
