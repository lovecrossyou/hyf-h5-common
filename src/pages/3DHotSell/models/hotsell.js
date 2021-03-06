import { setTokenFromQueryString } from '../../../utils/authority';
import { querySpecProduct } from '../service/hotsell';
export default {
  namespace: 'hotsell',
  state: {
    list:[]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/3DHotSell/page') {
          setTokenFromQueryString(query);
          dispatch({
            type: 'fetch',
          })

          dispatch({
            type: 'global/setTitle', payload: {
              text: '3D热销',
            },
          });

        }
      });
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const params = {
        pageNo:0,
        size:10
      }
      const list = yield call(querySpecProduct,params);

      yield put({
        type: 'save',
        payload: list
      });
    },


  },
  reducers: {
    save(state,action){
      return {
        ...state,
        list:action.payload
      }
    }
  },
};
