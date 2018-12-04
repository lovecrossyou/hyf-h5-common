import {queryWinGameListByStageDetail , queryInviteUserRank , queryPurchaseRank} from "../service/awardDetail";
const awardUrl = 'http://qnimage.xiteng.com/jiangpin_xiangqing@2x.png';


const pageSize = 8 ;


export default {
  namespace: 'award',
  state: {
    page_src: awardUrl, //页面图片
    dataSSQ:null,
    data3D:null,
    isShow:false,
    datePurchaseRank:[],
    dateInviteUserRank:[],

    friendCirclePageNo: -1,
    friendCircleList:[],



    platformPageNo: -1,
    platformList:[]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        console.log('query ',query)
        if (pathname === '/awardDetail/thePrizeForDetails') {
          const {lotteryStage} = query ;
          dispatch({
            type:'fetch3D',
            payload:{
              lotteryStage: lotteryStage,
              lotteryType: "FC3D"
            }
          })
        }
        else if (pathname === '/awardDetail/zeroPriceForDetails') {
          const {lotteryStage} = query ;
          dispatch({
            type:'fetchZero',
            payload:{
              lotteryStage: lotteryStage,
              lotteryType: "SSQ"
            }
          })
        }
        else if (pathname === '/awardDetail/monthlyFocus') {
          dispatch({
            type:'fetchInviteUserRank',
            payload:{}
          })
        }
      });
    },
    inviteUserRank({ dispatch, history }){
      dispatch({
        type:'fetchInviteUserRank',
        payload:{
          isShow:false
        }
      })
    }
  },
  effects: {
    *fetchZero({ payload }, { call, put }) {
      const data = yield call(queryWinGameListByStageDetail,payload);
      yield put({
        type: 'saveSSQ',
        payload: data
      });
    },
    *fetch3D({ payload }, { call, put }) {
      const data = yield call(queryWinGameListByStageDetail,payload);
      yield put({
        type: 'save3D',
        payload: data
      });
    },
    *fetchPurchaseRank({ payload }, { call, put }) {
      const data = yield call(queryPurchaseRank,payload);
      yield put({
        type: 'savePurchaseRank',
        payload: data
      });
    },
    *fetchInviteUserRank({ payload ,cb}, { call, put }) {
      const {type} = payload ;
      let params = {}
      if(type!=='friendList'){
        //请求平台数据
        params = {
          platformPageNo: 0,
          platformPageSize: pageSize
        }
      }
      else {
        // 请求朋友圈数据
        params = {
          friendCirclePageNo: 0,
          friendCirclePageSize: pageSize,
        }
      }

      const data = yield call(queryInviteUserRank,params);
      if(type!=='friendList'){
        yield put({
          type: 'savePlatformRank',
          payload: data
        });
      }
      else{
        yield put({
          type: 'saveFriendsRank',
          payload: data
        });
      }
      cb&&cb(data);
    }
  },
  reducers: {
    saveSSQ(state, action) {
      return { ...state, dataSSQ:action.payload };
    },
    save3D(state,action){
      return { ...state, data3D:action.payload };
    },
    savePurchaseRank(state,action){
      return { ...state, datePurchaseRank:action.payload };
    },
    saveInviteUserRank(state,action){
      console.log('aaaaaaaaaaaaaasaveInviteUserRank====',state);
      const oldDateInviteUserRank = state.dateInviteUserRank ;
      const dateInviteUserRank = action.payload.concat(oldDateInviteUserRank);
      return { ...state, dateInviteUserRank:dateInviteUserRank };
    },

    savePlatformRank(state,action){
      const {platformInviteRankUserInfo,userIconUrl,allRankOfFriendCircle,allRankOfPlatform,inviteAllUserAmount,friendCirclePageNo} = action.payload ;
      const oldDateInviteUserRank = state.platformList ;
      const list = platformInviteRankUserInfo.concat(oldDateInviteUserRank);

      return { ...state,
        platformList:list,
        userIconUrl,
        allRankOfFriendCircle,
        friendCirclePageNo,
        allRankOfPlatform,
        inviteAllUserAmount
      };
    },

    saveFriendsRank(state,action){
      const {friendCircleInviteRankUserInfo,userIconUrl,allRankOfFriendCircle,allRankOfPlatform,inviteAllUserAmount,friendCirclePageNo} = action.payload ;
      const oldDateInviteUserRank = state.friendCircleList ;
      const list = friendCircleInviteRankUserInfo.concat(oldDateInviteUserRank);

      return { ...state,
        friendCircleList:list,
        userIconUrl,
        allRankOfFriendCircle,
        friendCirclePageNo,
        allRankOfPlatform,
        inviteAllUserAmount
      };
    },

    purchaseRank(){
      return { isShow:true }
    }
  },
};
