export default {
  namespace: "global",
  state: {
    text: "",
    accessInfo:null,
    loading:false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query, search }) => {
        console.log('global accessInfo ',query.accessInfo);
        const accessInfo = query.accessInfo ;
        if(accessInfo){
          dispatch({
            type:'saveAccessInfo',
            payload:accessInfo
          });
        }
        dispatch({
          type: "fetch"
        });
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
    }
  },
  effects: {
    *setTitle({ payload }, { call, put, select }) {
      yield put({ type: "save", payload: payload });
    },
  }
};
