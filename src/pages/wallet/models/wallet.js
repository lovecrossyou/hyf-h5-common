import {
  fetchAccountInfo, fetchClientAccount, fetchUserProfitAllFriendInfo,
  fetchUserProfitInfo,
} from '../service/wallet';

export default {
  namespace: 'wallet',
  state: {
    accountInfo: null,
    userProfitInfo: null,
    userProfitInfo:null,
    userProfitAllFriendInfo:null
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
      const userProfitInfo = yield call(fetchUserProfitInfo, {});
      const accountInfo = yield call(fetchAccountInfo, payload);
      const userProfitAllFriendInfo = yield call(fetchUserProfitAllFriendInfo, payload);

      yield put({
        type: 'save', payload: {
          accountInfo,
          userProfitInfo,
          userProfitAllFriendInfo
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
        userProfitInfo: action.payload.userProfitInfo,
        userProfitAllFriendInfo: action.payload.userProfitAllFriendInfo,
      };
    },
  },
};
