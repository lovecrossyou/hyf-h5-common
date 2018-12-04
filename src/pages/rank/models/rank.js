import {queryInviteUserRank , queryPurchaseRank} from "../service/rank";
const awardUrl = 'http://qnimage.xiteng.com/award_detail.png';


const sortByRank = (a,b)=>{
  return parseInt(a.rank) - parseInt(b.rank) ;
}


const pageSize = 20 ;
export default {
  namespace: 'rank',
  state: {
    friendCirclePageNo: 0,
    friendCircleList:[],
    platformPageNo: 0,
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

      const nextPage = parseInt(platformPageNo) ;
      const {type} = payload ;
      let params = {
        friendCirclePageNo: 0,
        friendCirclePageSize: pageSize,
        platformPageNo: 0,
        platformPageSize: pageSize
      }


      // if(type!=='friendList'){
      //   //请求平台数据
      //   params = {
      //     platformPageNo: nextPage,
      //     platformPageSize: pageSize
      //   }
      // }
      // else {
      //   // 请求朋友圈数据
      //   params = {
      //     friendCirclePageNo: 0,
      //     friendCirclePageSize: pageSize,
      //   }
      // }

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


      return { ...state,
        friendCircleList:friendCircleInviteRankUserInfo.sort(sortByRank),
        platformList:platformInviteRankUserInfo.sort(sortByRank),
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
      return { ...state,
        friendCircleList:friendCircleInviteRankUserInfo.sort(sortByRank),
        platformList:platformInviteRankUserInfo.sort(sortByRank),
        userIconUrl,
        allRankOfFriendCircle,
        friendCirclePageNo,
        allRankOfPlatform,
        inviteAllUserAmount,
        platformPageNo
      };
    },

    purchaseRank(state){
      return {...state, isShow:true }
    },

    inviteUserRank(state){
      return {...state, isShow:false }
    }
  },
};
