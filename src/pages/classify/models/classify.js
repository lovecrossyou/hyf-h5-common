import { setTokenFromQueryString } from '../../../utils/authority';
import { fetchFirstCategory ,fetchSecondCategory} from '../service/classify';

export default {
  namespace: 'classify',
  state: {
    first_category_list:[],
    second_category_list:[]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/classify/page') {
          setTokenFromQueryString(query);
          dispatch({
            type: 'firstCategory',
            payload: {},
          });
        }
      });
    },
  },
  // 异步
  effects: {
    * firstCategory({ payload, cb }, { call, put }) {
      const list = yield call(fetchFirstCategory, {});
      yield put({
        type: 'saveFirstCategory',
        payload: list,
      });

      //继续请求第一个分类的内容
      const selectCategory = list[0];
      const second_category_list = yield call(fetchSecondCategory, {
        firstCategoryId:selectCategory.firstCategoryId
      });
      yield put({
        type: 'saveSecondCategory',
        payload: second_category_list,
      });
    },

    * secondCategory({ payload, cb }, { call, put }) {
      const userData = yield call(fetchSecondCategory, payload);
      yield put({
        type: 'saveSecondCategory',
        payload: userData,
      });
    },
  },
  // 同步
  reducers: {
    saveFirstCategory(state, action) {
      return { ...state, first_category_list: action.payload };
    },

    saveSecondCategory(state, action) {
      return { ...state, second_category_list: action.payload };
    },
  },
};