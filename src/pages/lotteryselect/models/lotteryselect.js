
export default {
  namespace: 'lotteryselect',
  state: {
    text: 'page work',
    list: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/lotteryselect/page') {
          dispatch({
            type: 'fetch'
          })
          dispatch({
            type:'global/setTitle',payload:{
              text:"组件"
            }
          })
        }
      });
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'save', payload: {
          text: 'page init'
        }
      });
    },
    *delete({ payload }, { call, put }) {
      yield put({
        type: 'save', payload: {
          list: []
        }
      });
    },

  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
