import {queryAddress, queryCreate, queryDel, querySetDef} from '../services/address';
import { setTokenFromQueryString } from '../../../utils/authority';

export default {
  namespace: 'address',
  state: {
    list: [],
    activeAddress:null,
    backType:null
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/address/page') {
          const backType = query.backType ;
          if(backType){
            dispatch({
              type:'saveBackType',
              payload:backType
            })
          }
          setTokenFromQueryString(query);
          dispatch({
            type: 'fetch',
          })

          dispatch({
            type: 'global/setTitle', payload: {
              text: '地址列表',
            },
          });
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
        type: 'save',
        payload: list.content
      });
    },

    *create({ payload ,cb}, { call, put }) {
      const res = yield call(queryCreate,payload);
      cb&&cb();
    },


    *delete({ payload,cb }, { call, put }) {
      const res = yield call(queryDel,payload);
      cb&&cb();
    },


    *setDefault({ payload,cb }, { call, put }) {
      const res = yield call(querySetDef,payload);
      cb&&cb();
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, list:action.payload };
    },

    setActive(state,action){
      return { ...state, activeAddress:action.payload };
    },

    saveBackType(state,action){
      return {
        ...state,
        backType:action.payload
      }
    }

  },
};
