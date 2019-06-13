import {
  fetchAccountInfo, fetchShareSellProfitRmb, fetchInviteProfitXtb, fetchUserProfitAllFriendInfo,
  fetchUserProfitInfo, fetchUserProfitDiamondFriendInfo, fetchBill, fetchBankCardList, fetchWithdraw,checkSetPayPassword
} from '../service/wallet';


import { setTokenFromQueryString } from '../../../utils/authority';

export default {
  namespace: 'wallet',
  state: {
    accountInfo: null,
    userProfitInfo: null,
    userProfitAllFriendInfo: null,
    inviteProfitXtb: null,
    // 钻石好友
    userDiamondFriends: [],
    user: null,
    billings: [],
    bankList: [],
    currencyType: 3,
    withdrawOption: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/wallet/page' || pathname === '/wallet/rmbContainerView' || pathname === '/wallet/withdrawDeposits') {
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
        } else if (pathname === '/wallet/billingDetails') {
          dispatch({
            type: "fetchBillings",
            payload: {
              currencyType: 3,
              pageNo: 0,
              size: 20
            }
          })
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

      //请求当前用户的银行卡, 列表,默认 获取第一张银行卡
      const bankList = yield call(fetchBankCardList, payload);


      yield put({
        type: 'save', payload: {
          accountInfo,
          userProfitInfo,
          userProfitAllFriendInfo,
          inviteProfitXtb,
          shareSellProfitRmb,
          bankList: bankList.content,
          // withdrawOption
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
    * fetchDiamondFriends({ payload, cb }, { call, put }) {
      const params = {
        profitUserId: payload.user.profitUserId
      };
      yield put({
        type: 'saveUser',
        payload: payload.user
      });
      const lists = yield call(fetchUserProfitDiamondFriendInfo, params);
      yield put({
        type: 'saveUserDiamondFriends',
        payload: lists
      });
      cb && cb();
    },
    * fetchBillings({ payload }, { call, put }) {
      const lists = yield call(fetchBill, payload);
      yield put({
        type: 'saveBillings',
        payload: lists,
        currencyType: payload.currencyType
      });
    },

    //提现
    * fetchWithDraw({ payload,cb }, { call, put }) {
      const res = yield call(fetchWithdraw, payload);
      cb&&cb(res);
    },
    //检测设置支付密码
    * checkSetPayPassword({ payload,cb }, { call, put }) {
      const res = yield call(checkSetPayPassword, payload);
      cb&&cb(res);
    }
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
        bankList: action.payload.bankList,
        withdrawOption: action.payload.withdrawOption,
      };
    },
    saveUserDiamondFriends(state, action) {
      return {
        ...state,
        userDiamondFriends: action.payload
      }
    },
    saveUser(state, action) {
      return {
        ...state,
        user: action.payload
      }
    },
    saveBillings(state, action) {
      return {
        ...state,
        billings: action.payload.monthBills,
        currencyType: action.currencyType
      }
    }
  },
};
