import { fetchAddBankCard, fetchBankCardKindListMsg, fetchBankCardList, fetchCheckCode } from '../services/bank';

import { setTokenFromQueryString } from '../../../utils/authority';

export default {
  namespace: 'bank',
  state: {
    bankNameList : [],
    bankInfo : {},
    bankCardList:[],
    activeBank:null
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if(pathname === '/bank/page'){
          setTokenFromQueryString(query);
          dispatch({
            type: 'fetch',
            payload: {},
          })
        }
        else if (pathname === '/bank/addBankCard' ) {

        }
      });
    },

  },
  effects: {
    * fetch({ payload }, { call, put }) {
      const {content} = yield call(fetchBankCardKindListMsg, payload);
      let list = content.map(bank=>Object.assign({...bank,label:bank.name,value:bank.id})) ;
      yield put({
        type: 'save', payload:list
      });

      const bankCardList= yield call(fetchBankCardList, payload) ;
      yield put({
        type: 'saveBankCardList', payload:bankCardList.content
      });
    },

    * getCheckCode({payload},{call,put}){
      yield call(fetchCheckCode, payload);
    },

    * addBank({payload,cb},{call,put}){
      const res = yield  call(fetchAddBankCard,payload);
      cb&&cb(res);
    }

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
    },

    saveBankCardList(state,action){
      return {
        ...state,
        bankCardList:action.payload
      }
    },

    setActiveBank(state,action){
      return {
        ...state,
        activeBank:action.payload
      }
    }
  },
};
