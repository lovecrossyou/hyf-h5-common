import { fetchClientAccount, fetchUserProfitInfo } from '../service/wallet';

export default {
  namespace: 'wallet',
  state: {
    clientAccount: {},
    userProfitInfo: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/wallet/page') {
          dispatch({
            type: 'fetch',
          });
          dispatch({
            type: 'global/setTitle', payload: {
              text: '钱包',
            },
          });
        }
      });
    },
  },
  effects: {
    * fetch({ payload }, { call, put }) {
      const clientAccount = yield call(fetchClientAccount, payload);
      const userProfitInfo = yield call(fetchUserProfitInfo, payload);

      yield put({
        type: 'save', payload: {
          clientAccount,
          userProfitInfo,
        },
      });
    },
    * delete({ payload }, { call, put }) {
      yield put({
        type: 'save', payload: {
          list: [],
        },
      });
    },

  },
  reducers: {
    save(state, action) {
      return { ...state,
        clientAccount: action.payload.clientAccount,
        userProfitInfo: action.payload.userProfitInfo,
      };
    },
  },
};
