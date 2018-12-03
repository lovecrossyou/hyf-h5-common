import {queryInviteUserRank , queryPurchaseRank} from "../service/rank";
const awardUrl = 'http://pax4lf8m2.bkt.clouddn.com/award_detail.png';


const pageSize = 8 ;


export default {
  namespace: 'rank',
  state: {
    friendCirclePageNo: -1,
    friendCircleList:[],
    platformPageNo: -1,
    platformList:[],

    isShow:false
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/rank/page') {
          dispatch({
            type:'fetchInviteUserRank',
            payload:{
              type:'platform'
            },
          })
        }
      });
    }
  },
  effects: {
    *fetchPurchaseRank({ payload }, { call, put }) {
      const data = yield call(queryPurchaseRank,payload);
      yield put({
        type: 'savePurchaseRank',
        payload: data
      });
    },

    *fetchInviteUserRank({ payload ,cb}, { call, put ,select}) {
      const {rankStore} = yield select(state => {
        const rankStore = state.rank;
        return {rankStore};
      });

      const {platformPageNo,friendCirclePageNo} = rankStore ;

      const nextPage = parseInt(platformPageNo) + 1 ;
      const {type} = payload ;
      let params = {}
      if(type!=='friendList'){
        //请求平台数据
        params = {
          platformPageNo: nextPage,
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
    savePurchaseRank(state,action){
      return { ...state, datePurchaseRank:action.payload };
    },
    saveInviteUserRank(state,action){
      const oldDateInviteUserRank = state.dateInviteUserRank ;
      const dateInviteUserRank = action.payload.concat(oldDateInviteUserRank);
      return { ...state, dateInviteUserRank:dateInviteUserRank };
    },

    savePlatformRank(state,action){
      const {platformPageNo,friendCircleInviteRankUserInfo,platformInviteRankUserInfo,userIconUrl,allRankOfFriendCircle,allRankOfPlatform,inviteAllUserAmount,friendCirclePageNo} = action.payload ;
      const oldPlatformList = state.platformList ;
      const list_platform = oldPlatformList.concat(platformInviteRankUserInfo);

      return { ...state,
        friendCircleList:friendCircleInviteRankUserInfo,
        platformList:list_platform,
        userIconUrl,
        allRankOfFriendCircle,
        friendCirclePageNo,
        allRankOfPlatform,
        inviteAllUserAmount,
        platformPageNo
      };
    },

    saveFriendsRank(state,action){
      const {platformPageNo,friendCircleInviteRankUserInfo,platformInviteRankUserInfo,userIconUrl,allRankOfFriendCircle,allRankOfPlatform,inviteAllUserAmount,friendCirclePageNo} = action.payload ;
      const oldDateInviteUserRank = state.friendCircleList ;
      const list = oldDateInviteUserRank.concat(friendCircleInviteRankUserInfo);
      return { ...state,
        friendCircleList:list,
        platformList:platformInviteRankUserInfo,
        userIconUrl,
        allRankOfFriendCircle,
        friendCirclePageNo,
        allRankOfPlatform,
        inviteAllUserAmount,
        platformPageNo
      };
    },

    purchaseRank(){
      return { isShow:true }
    }
  },
};
