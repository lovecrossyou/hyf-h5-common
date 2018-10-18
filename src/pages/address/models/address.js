
import {queryAddress} from "../services/address";

export default {
  namespace: 'address',
  state: {
    text: 'page work',
    list: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/address'||pathname === '/') {
          dispatch({
            type: 'fetch'
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
      const list = yield call(queryAddress,payload);
      yield put({
        type: 'save', payload: list.data
      });
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
