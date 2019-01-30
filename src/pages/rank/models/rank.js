import {queryInviteUserRank , queryPurchaseRank} from "../service/rank";
import { setTokenFromQueryString } from '../../../utils/authority';
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
    isShow:false,
    purchaseRankUserInfo:{
      allPurchaseAmount:0,// 总购买份数  ,
      rank:0,
      userIconUrl:'' ,
      userName:''
    },
    inviteRankUserInfo:{
      friendAmount:0,// 好友人数 ,
      rank:0,
      userIconUrl:'' ,
      userName:''
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/rank/page') {
          setTokenFromQueryString(query);
          dispatch({
            type:'fetchInviteUserRank',
          })

          //标题
          dispatch({
            type:'global/setTitle',payload:{
              text:"榜单"
            }
          })
        }
        else if (pathname === '/rank/friendCircleInviteRank'){
          //标题
          dispatch({
            type:'global/setTitle',payload:{
              text:"朋友圈排行"
            }
          })
        }
      });
    }
  },
  effects: {
    *fetchPurchaseRank({ payload }, { call, put }) {
      let params = {
        friendCirclePageNo: 0,
        friendCirclePageSize: pageSize,
        platformPageNo: 0,
        platformPageSize: pageSize
      }
      const data = yield call(queryPurchaseRank,params);
      yield put({
        type: 'savePurchaseRank',
        payload: data
      });
    },

    *fetchInviteUserRank({ payload ,cb}, { call, put ,select}) {
      let params = {
        friendCirclePageNo: 0,
        friendCirclePageSize: pageSize,
        platformPageNo: 0,
        platformPageSize: pageSize
      }
      const data = yield call(queryInviteUserRank,params);
      yield put({
        type: 'saveInviteRank',
        payload: data
      });
      cb&&cb(data);
    }
  },
  reducers: {
    savePurchaseRank(state,action){
      const {allPurchaseAmount,purchaseRankUserInfo,platformTotalCount,userIconUrl,allRankOfFriendCircle,allRankOfPlatform,friendCirclePurchaseRankUserInfo,platformPurchaseRankUserInfo} = action.payload ;
      return { ...state,
        friendCircleList:friendCirclePurchaseRankUserInfo.sort(sortByRank),
        platformList:platformPurchaseRankUserInfo.sort(sortByRank),
        userIconUrl,
        allRankOfFriendCircle,
        allRankOfPlatform,
        inviteAllUserAmount:platformTotalCount,
        isShow:true,
        purchaseRankUserInfo,
        allPurchaseAmount:allPurchaseAmount
      };
      return { ...state, datePurchaseRank:action.payload };
    },


    saveInviteRank(state,action){
      const {inviteRankUserInfo,platformPageNo,friendCircleInviteRankUserInfo,platformInviteRankUserInfo,userIconUrl,allRankOfFriendCircle,allRankOfPlatform,inviteAllUserAmount,friendCirclePageNo} = action.payload ;
      return { ...state,
        friendCircleList:friendCircleInviteRankUserInfo.sort(sortByRank),
        platformList:platformInviteRankUserInfo.sort(sortByRank),
        userIconUrl,
        allRankOfFriendCircle,
        friendCirclePageNo,
        allRankOfPlatform,
        inviteAllUserAmount,
        platformPageNo,
        isShow:false,
        inviteRankUserInfo
      };
    }
  },
};
