import {fetchClientAccount} from '../service/bank';

import { setTokenFromQueryString } from '../../../utils/authority';

export default {
  namespace: 'wallet',
  state: {

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/wallet/page' ) {
          setTokenFromQueryString(query);
          dispatch({
            type: 'fetch',
            payload: {},
          })
        }
      });
    },
  },
  effects: {
    * fetch({ payload }, { call, put }) {
      const userProfitInfo = yield call(fetchClientAccount, payload);
      yield put({
        type: 'save', payload: {
          userProfitInfo
        },
      });
    }
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        userProfitInfo: action.payload.userProfitInfo
      };
    }

  },
};
