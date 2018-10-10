import { fetchAccountInfo, fetchClientAccount, fetchUserProfitInfo } from '../service/wallet';

export default {
  namespace: 'wallet',
  state: {
    accountInfo: {},
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
      // const clientAccount = yield call(fetchClientAccount, payload);
      // const userProfitInfo = yield call(fetchUserProfitInfo, payload);
      const accountInfo = yield call(fetchAccountInfo, payload);

      yield put({
        type: 'save', payload: {
          accountInfo,
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
        accountInfo: action.payload.accountInfo,
      };
    },
  },
};
