import { fetchAstroInfo } from '../service/astro';

export default {
  namespace: 'astro',
  state: {
    selectAstro:null
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/astro/page') {
          dispatch({
            type:'fetch',
            payload:{},
            cb:()=>{
              console.log('callback.....')
            }
          })
        }
      });
    },
  },
  // 异步
  effects: {
    *fetch({ payload ,cb}, { call, put }) {
      const result = yield call(fetchAstroInfo,payload);
      yield put({
        type:'saveAstro',
        payload:result
      });
      cb&&cb();
    }
  },
  // 同步
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },

    saveAstro(state, action ) {
      console.log('astro ', action.payload);
      return {
        ...state,
        selectAstro:action.payload
      }
    },
  },
};
