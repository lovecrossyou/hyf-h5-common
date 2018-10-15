class Ball{
  constructor(text='',color='#cc2636'){
    this.text = text ;
    this.color = color ;
  }
}


export default {
  namespace: 'lotteryselect',
  state: {
    selectedNos: [],
    codes_3d:[],
    codes_fucai:[]
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
      //初始化选号面板


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
