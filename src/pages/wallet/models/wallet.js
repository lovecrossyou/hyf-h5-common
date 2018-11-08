import {
  fetchAccountInfo, fetchShareSellProfitRmb, fetchInviteProfitXtb, fetchUserProfitAllFriendInfo,
  fetchUserProfitInfo,
} from '../service/wallet';

import { setTokenFromQueryString } from '../../../utils/authority';

export default {
  namespace: 'wallet',
  state: {
    accountInfo: null,
    userProfitInfo: null,
    userProfitAllFriendInfo: null,
    inviteProfitXtb: null,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/wallet/page' || pathname === '/wallet/rmbContainerView') {
          setTokenFromQueryString(query);
          dispatch({
            type: 'fetch',
            payload: {},
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
      const userProfitInfo = yield call(fetchUserProfitInfo, payload);
      const accountInfo = yield call(fetchAccountInfo, payload);
      const userProfitAllFriendInfo = yield call(fetchUserProfitAllFriendInfo, payload);
      const inviteProfitXtb = yield call(fetchInviteProfitXtb, payload);
      const shareSellProfitRmb = yield call(fetchShareSellProfitRmb, payload);

      yield put({
        type: 'save', payload: {
          accountInfo,
          userProfitInfo,
          userProfitAllFriendInfo,
          inviteProfitXtb,
          shareSellProfitRmb
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
      return {
        ...state,
        accountInfo: action.payload.accountInfo,
        userProfitInfo: action.payload.userProfitInfo,
        userProfitAllFriendInfo: action.payload.userProfitAllFriendInfo,
        inviteProfitXtb: action.payload.inviteProfitXtb,
        shareSellProfitRmb: action.payload.shareSellProfitRmb,
      };
    },
  },
};
