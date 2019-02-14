import { queryActiveInfo } from '../pages/personInfo/service/personInfo';

export default {
  namespace: "global",
  state: {
    text: "",
    accessInfo:null,
    loading:false,
    activeInfo:{}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query, search }) => {
        console.log('global accessInfo ',query.accessInfo);
        const accessInfo = query.accessInfo ;
        const platform = query.platform ;
        if(accessInfo){
          dispatch({
            type:'saveAccessInfo',
            payload:accessInfo
          });
        }
        dispatch({
          type: "fetch"
        });

        dispatch({
          type:'fetchActiveInfo'
        })

        if(platform){
          dispatch({
            type:'savePlatform',
            payload:platform
          });
        }
      });
    }
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },

    saveAccessInfo(state,{payload}){
      return {
        ...state,
        accessInfo:payload
      }
    },

    setText(state, { payload }) {
      return {
        ...state,
        text: payload
      };
    },

    savePlatform(state, { payload }){
      return {
        ...state,
        platform:payload
      }
    },

    saveActiveInfo(state,action){
      return {
        ...state,
        activeInfo:action.payload
      }
    },
  },
  effects: {
    *setTitle({ payload }, { call, put, select }) {
      yield put({ type: "save", payload: payload });
    },

    *fetchActiveInfo({ payload, cb }, { call, put }) {
      const activeInfo = yield call(queryActiveInfo, payload);
      yield put({
        type: 'saveActiveInfo',
        payload: activeInfo,
      });
    },
  }
};
