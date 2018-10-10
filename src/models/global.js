export default {
  namespace: "global",
  state: {
    text: "Title"
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query, search }) => {
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
