import {queryWinGameListByStageDetail} from "../service/awardDetail";

const awardUrl = 'http://pax4lf8m2.bkt.clouddn.com/award_detail.png';


export default {
  namespace: 'award',
  state: {
    page_src: awardUrl, //页面图片
    dataSSQ:null,
    data3D:null
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {

        console.log('query ',query)
        console.log('pathname ',pathname)
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
      });
    },
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
  },

  reducers: {
    saveSSQ(state, action) {
      return { ...state, dataSSQ:action.payload };
    },

    save3D(state,action){
      return { ...state, data3D:action.payload };

    }
  },
};
