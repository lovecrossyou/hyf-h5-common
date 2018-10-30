/**
 * Created by zhulizhe on 2018/10/28.
 */

import { setTokenFromQueryString } from '../../../utils/authority';
import {
  generateQRCode, queryConstellationDetail, queryModifyConstellation,
  queryUserInfo,
} from '../service/personInfo';

export default {
  namespace: 'personInfo',
  state: {
    selectAstro: null,
    userInfo: null,
    constellationDetail: null,
    sex: 1,
    name: null,
    selectSex: [
      {
        label: '男',
        value: 1,
      },
      {
        label: '女',
        value: 2,
      },
    ],
    qrData: null,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/personInfo/page') {
          setTokenFromQueryString(query);
          dispatch({
            type: 'userInfo',
            payload: {},
          });
        }
        else if (pathname === '/personInfo/qrCode') {
          // 生成二维码
          dispatch({
            type: 'generateQRCode',
          });
        }
      });
    },
  },
  effects: {
    * userInfo({ payload, cb }, { call, put }) {
      const userData = yield call(queryUserInfo, payload);
      yield put({
        type: 'saveUserInfo',
        payload: userData,
      });

      //有星座信息则继续请求星座数据
      if (userData.userInfo.constellation !== '') {
        const result = yield call(queryConstellationDetail, payload);
        yield put({
          type: 'saveDetail',
          payload: result,
        });
      }
    },
    * delete({ payload }, { call, put }) {
      yield put({
        type: 'save', payload: {
          list: [],
        },
      });
    },

    * generateQRCode({ payload }, { call, put, select }) {
      const personInfo = yield select(state => {
        return { personStore: state.personInfo.userInfo };
      });
      const { userInfo } = personInfo.personStore;
      let inviteId = userInfo.userId;
      const url = 'https://www.xiteng.com/xitenggamejar/index/index?inviteId=' + inviteId;
      const qrData = yield call(generateQRCode, url);
      yield put({
        type: 'saveqrCode',
        payload: qrData,
      });
    },

    //设置星座和性别
    * constellation({ payload, cb }, { call, put, select }) {
      // 设置星座
      const result = yield call(queryModifyConstellation, payload);
      if (result.respMsg === 'successful') {
        const userData = yield call(queryUserInfo, payload);
        yield put({
          type: 'saveUserInfo',
          payload: userData,
        });
      }
    },
  },
  reducers: {
    saveUserInfo(state, action) {
      return { ...state, userInfo: action.payload };
    },

    saveDetail(state, action) {
      return { ...state, constellationDetail: action.payload };
    },

    saveqrCode(state, action) {
      return {
        ...state,
        qrData: action.payload,
      };
    },
  },
};
