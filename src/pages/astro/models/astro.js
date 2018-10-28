import { fetchAstroInfo, queryUserInfo, queryModifyConstellation, queryConstellationDetail } from '../service/astro';
import { setTokenFromQueryString } from '../../../utils/authority';

export default {
  namespace: 'astro',
  state: {
    selectAstro:null,
    userInfo:null,
    constellationDetail:null,
    sex:null,
    name:null,
    selectSex:[
      {
        label: '男',
        value: '男',
      },
      {
        label: '女',
        value: '女',
      }
    ],
    selectedSex:null
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/astro/PersonalInformation') {
          dispatch({
            type:'userInfo',
            payload:{}
          })
          // setTokenFromQueryString(query);
        }

          if (pathname === '/astro/page') {
          dispatch({
            type:'userInfo',
            payload:{}
          })

          dispatch({
            type: 'global/setTitle', payload: {
              text: '星座选择',
            },
          });

        } else if(pathname === '/astro/AstroItem'){
          dispatch({
            type: 'global/setTitle', payload: {
              text: '12星座选择',
            },
          });
        }else if(pathname === '/astro/personalInformation'){
          dispatch({
            type:"userInfo",
            payload:{}
          })
        }
      });
    },
  },
  // 异步
  effects: {
    *userInfo({ payload ,cb}, { call, put }) {
      const userData = yield call(queryUserInfo,payload);
      yield put({
        type:'saveUserInfo',
        payload:userData
      });

      //有星座信息则继续请求星座数据
      if(userData.userInfo.constellation!==''){
        const result = yield call(queryConstellationDetail, payload);
        yield put({
          type:'saveDetail',
          payload:result
        })
      }
    },

    //设置星座和性别
    *constellation({ payload ,cb}, { call, put,select }) {
      const params = yield select(state=>{
        const selectAstro = state.astro.selectAstro ;
        const sex = state.astro.sex ;
        return {
          sex:sex==='man'? 1 : 2,
          constellation:selectAstro.name
        }
      })

      // 设置星座
      const result = yield call(queryModifyConstellation, params);
      if (result.respMsg === 'successful') {
        cb();
      }
    },

    *detail({ payload ,cb}, { call, put }) {
      const result = yield call(queryConstellationDetail, payload);
      yield put({
        type:'saveDetail',
        payload:result
      })
    }
    //
  },
  // 同步
  reducers: {
    saveUserInfo(state, action) {
      return { ...state, userInfo:action.payload };
    },

    saveDetail(state,action){
      return { ...state, constellationDetail:action.payload };

    },

    saveAstro(state, action ) {
      console.log('astro ', action.payload);
      return {
        ...state,
        selectAstro:action.payload
      }
    },

    setSex(state,action){
      return {
        ...state,
        sex:action.payload
      }
    },
    // 选择性别
    setSelectSex(state,action){
      return{
        ...state,
        selectedSex:action.payload
      }
    }


  },
};
