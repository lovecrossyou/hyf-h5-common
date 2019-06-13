import { setTokenFromQueryString } from '../../../utils/authority';
import { purchaseInfo} from '../service/buyDetail';

export default {
  namespace: 'buyDetail',
  state: {
    purchaseInfo:[]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/buyDetail/page') {
          const id = query.id;
          setTokenFromQueryString(query);
          dispatch({
            type: 'purchaseInfo',
            payload: {discountGameId:id},
          });
        }
      });
    },
  },
  // 异步
  effects: {
    * purchaseInfo({ payload, cb }, { call, put }) {
      const detailList = yield call(purchaseInfo, payload);
      yield put({
        type: 'savedetailList',
        payload: detailList,
      });
    },
  },
  // 同步
  reducers: {
    savedetailList(state,action){
      return {
        ...state,
        purchaseInfo:action.payload
      }
    }
  },
};
