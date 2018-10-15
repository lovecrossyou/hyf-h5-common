class Ball{
  constructor(text='',color='#cc2636'){
    this.text = text ;
    this.color = color ;
  }
}

class Bid{
  constructor(type){
    this.balls = [] ;
    if (type==="3d"){
      this.aimCount  = 3;
    }else{
      this.aimCount  = 7;
    }
  }
}


function generateBalls(begin, count, color){
  let result = [];
  for(let i=begin;i<count+begin;i++){
    result.push(new Ball(i, color));
  }
  return result;
}


function generatesFucai() {
   return generateBalls(1, 33, 'red').concat(generateBalls(1, 16, 'blue'));
}

function generates3D() {
  return generateBalls(0, 10, 'red')
}

export default {
  namespace: 'lotteryselect',
  state: {
    selectedBids: [],
    codes_panel:[]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/lotteryselect/page') {
          dispatch({
            type: 'init'
          })
          dispatch({
            type:'global/setTitle',payload:{
              text:"组件"
            }
          })
        }
      });
    }
  },
  effects: {
    *init({ payload }, { call, put }) {
      //初始化选号面板
      let balls = generatesFucai();
      yield put({
        type: 'save', payload:balls
      });
    },

    *delete({ payload }, { call, put }) {
      yield put({
        type: 'save', payload: {
          list: []
        }
      });
    },

  },
  reducers: {
    save(state, action) {
      return { ...state, codes_panel:action.payload };
    },
  },
};
