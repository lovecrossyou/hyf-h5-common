import { fetchPayResult, fetchUpdateToVipUser, fetchUserVipInfo } from '../service/member';
import { setTokenFromQueryString } from '../../../utils/authority';

export default {
  namespace: 'member',
  state: {
    userVipInfo:null,
    payResult:null,
    upgradeVIP:null
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/member/page') {
          setTokenFromQueryString(query);
          dispatch({
            type: 'fetch',
            payload:{}
          })
          dispatch({
            type:'global/setTitle',payload:{
              text:"会员俱乐部"
            }
          })
        }
        if(pathname === '/member/payResult'){
          const payOrderNo = query.payOrderNo ;
          dispatch({
            type: 'payResult',
            payload:{
              payOrderNo:payOrderNo,
              payChannel:"WeixinMiniProgramPay"
            }
          })
        }
      });
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('fetchUserVipInfo before',payload)

      const response = yield call(fetchUserVipInfo,payload)

      console.log('fetchUserVipInfo ',fetchUserVipInfo)
      yield put({
        type: 'save',
        payload:response
      });
    },

    *upgrade({ payload,cb }, { call, put }) {
      const response = yield call(fetchUpdateToVipUser,payload)
      cb&&cb(response);
    },

    *delete({ payload }, { call, put }) {
      yield put({
        type: 'save', payload: {
          list: []
        }
      });
    },

    *payResult({ payload }, { call, put }) {
      const res = yield call(fetchPayResult,payload) ;
      yield put({
        type: 'savePayResult', payload:res
      });
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, userVipInfo:action.payload };
    },

    savePayResult(state,action){
      return { ...state, payResult:action.payload };
    },

    saveVip(state,action){
      return { ...state, upgradeVIP:action.payload };

    }
  },
};
