import { fetchBankCardKindListMsg } from '../service/bank';

import { setTokenFromQueryString } from '../../../utils/authority';

export default {
  namespace: 'bank',
  state: {
    bankNameList : [],
    bankInfo : {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/bank/addBankCard' ) {
          setTokenFromQueryString(query);
          dispatch({
            type: 'fetch',
            payload: {},
          })
        }
      });
    },

  },
  effects: {
    * fetch({ payload }, { call, put }) {
      const {content} = yield call(fetchBankCardKindListMsg, payload);
      console.log('bankNameList ### ',content)
      let list = content.map(bank=>Object.assign({...bank,label:bank.name})) ;
      console.log('list#### ',list);
      yield put({
        type: 'save', payload:list
      });
    },

  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        bankNameList: action.payload
      };
    },
    changeBankDataValue(state,action){
      console.log(action)
      return {
        ...state,
        bankdatavalue:action.payload
      }
    },
    saveBankInfo(state,action){
      return {
        ...state,
        bankInfo:action.payload
      }
    }

  },
};
