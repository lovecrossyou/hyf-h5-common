import { setTokenFromQueryString } from '../../../utils/authority';
import { fetchMessageList } from '../service/message.js';

export default {
  namespace: 'message',
  state: {
    messageData:{}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/ximessage/page') {
          setTokenFromQueryString(query);
          dispatch({
            type:'fetch',
            payload:{
              pageNo: 0,
              size: 20
            }
          })
        }
      });
    },
  },
  effects: {
    * fetch( {payload} , { call , put } ){
      const messageData = yield call(fetchMessageList,payload);
      yield put({
        type:'saveMessage',
        payload:{
          messageData
        }
      })
    }
  },
  reducers: {
    saveMessage(state,action){
      return {
        ...state,
        messageData:action.payload.messageData
      }
    }
  },
};
