function  deepClone(data) {
  const type = this.judgeType(data);
  let obj;
  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    // 不再具有下一层次
    return data;
  }
  if (type === 'array') {
    // eslint-disable-next-line
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(this.deepClone(data[i]));
    }
  } else if (type === 'object') {
    // 对原型上的方法也拷贝了....
    // eslint-disable-next-line
    for (const key in data) {
      obj[key] = this.deepClone(data[key]);
    }
  }
  return obj;
}


function  judgeType(obj) {
  // tostring会返回对应不同的标签的构造函数
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
}



function formatValue(value) {
  if (value === ''){
    return value;
  }
  if (value < 10){
    return '0' + value;
  }else{
    return value;
  }
}

class Ball{
  constructor(text,color){
    this.text = ''+text;
    this.color = color ;
    this.active = false;
  }
  equal(ball){
    return this.color === ball.color && this.text === ball.text;
  }
  static copy(other){
     return new Ball(other.text, other.color);
  }
}


class Bid{

  createBall(type, robot, color){
    this.type = type;
    if (robot === false){
      return new Ball('', color);
    }else{
      let base = 0;
      if(type === '3d' || color ==='blue'){
        base = 16;
      }else{
        base = 33;
      }

      let randomValue = 0;
      do{
        randomValue = formatValue(Math.floor(Math.floor(Math.random() * base))+1);
        if (this.type === '3d'){
          break;
        }
      }while(this.hasSelect(new Ball(randomValue, color)));

      return new Ball(randomValue, color);
    }
  }

  hasSelect(selectBall){
      for (let ball of this.balls){
        if (selectBall.equal(ball)){
           return true;
        }
    }
    return false;
  }
  constructor(type, robot=false){
    this.buyCount = 1;
    this.balls = [] ;
    this.type = type;
    this.red_selectCount = 0;
    this.blue_selectCount = 0;

    if (type==="3d"){
      this.aimCount  = 3;
      for (let i = 0; i < this.aimCount; i++){
         this.balls.push(this.createBall(type, robot, 'red'));
      }
    }else{
      this.aimCount  = 7;
      for (let i = 0; i < this.aimCount - 1; i++){
        this.balls.push(this.createBall(type, robot, 'red'));
      }
      this.balls.push(this.createBall(type, robot, 'blue'));
    }

  }

  clear(){
     for (let i = 0; i < this.aimCount; i++){
        this.balls[i].text = '';
     }
     this.red_selectCount = 0;
     this.blue_selectCount = 0;
  }

  clone(){
     return Bid.copy(this);

  }
  static copy(other){
    let bid = new Bid();
    bid.red_selectCount = parseInt(other.red_selectCount);
    bid.blue_selectCount = parseInt(other.blue_selectCount);
    bid.aimCount = parseInt(other.aimCount);
    bid.buyCount = parseInt(other.buyCount);
    bid.type = other.type;
    bid.balls = other.balls.map((item)=>Ball.copy(item));
    return bid;
  }
  setCount(count){
    this.buyCount = count;
  }

  /**
   * 填充空球，如果选完一注，返回true，否则false
   * @param ball
   * @returns {boolean}
   */
  setBall(ball){
    if (ball.color === 'red'){
      let redCount = this.aimCount -1;
      if (this.type==='3d'){
         redCount = this.aimCount;
      }
      for (let i = 0; i < redCount; i++){
         if (this.balls[i].text === ''){
             this.balls[i] = new Ball(ball.text, ball.color);
             this.red_selectCount++
             break;
         }
      }
    }else {
      let blueIndex = this.aimCount - 1;
      this.blue_selectCount++;
      this.balls[blueIndex] = new Ball(ball.text, ball.color);
    }
    return this.red_selectCount + this.blue_selectCount === this.aimCount;

  }

  unSelectBall(ball){
    if (ball.text === ''){
      return;
    }
    if (ball.color === 'red'){
      let redCount = this.aimCount -1;
      for (let i = 0; i < redCount; i++){
         if (this.balls[i].text === ball.text){
            this.balls[i].text = '';
            this.red_selectCount--;
            return;
         }
      }
    }else {
       let blueIndex = this.aimCount - 1;
       this.blue_selectCount--;
       this.balls[blueIndex].text = '';
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
   return generateBalls(1, 33, 'red').concat(generateBalls(0, 16, 'blue'));
}

function generates3D() {
  return generateBalls(0, 10, 'red')
}

function resetPannel(codes_pannel){
  for (let ball of codes_pannel){
    ball.active = false;
  }
  return codes_pannel;
}

function updatePannel(codes_panel, ball){
  for (let item of codes_panel){
    if (item.equal(ball)){
      item.active = false;
      return;
    }
  }
}

export default {
  namespace: 'lotteryselect',
  state: {
    selectedBids: [],
    //号码
    codes_panel:[],
    // 初始化数组
    currentBid:new Bid('fucai'),

    totalCount:0
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/lotteryselect/page') {
          //init selectedBids
          const totalCount = 6 ;
          // const totalCount = parseInt(query.totalCount );
          const type = 'fucai' ;
          // const type = query.type ;

          const nos = query.nos ;

          dispatch({
            type: 'init',
            payload:{totalCount,type}
          })

          dispatch({
            type:'saveBids',
            payload:[]
          })
        }
      });
    }
  },
  effects: {
    *init({ payload }, { call, put }) {
      //初始化选号面板
      const {totalCount,type} = payload ;
      let balls = [] ;
      if(type === '3d'){
        balls = generates3D();
      }
      else {
        balls = generatesFucai();
      }
      yield put({
        type: 'save', payload:{
          balls:balls,
          totalCount:totalCount,
          type:type
        }
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
      let {totalCount , type} = action.payload;
      return { ...state,
        codes_panel:action.payload.balls,
        totalCount,
        type,
        currentBid:new Bid(type),
      };
    },

    saveBids(state, action) {
      let bidArray = action.payload;
      let result = [];
      for (let i = 0; i < bidArray.length; i++){
        result.push(Bid.copy(bidArray[i] ));
      }
      const state_now = { ...state, selectedBids:result };
      console.log(state_now);
      return state_now;
    },

    selectBall(state,action){
      const ball = action.payload ;
      let type = state.currentBid.type;
      if (type === 'fucai'){
        if (ball.active === true){
           return state;
        }
        ball.active = true;
      }

      // console.log('selectBall ball ',ball)
      let currentBid = state.currentBid;
      let selectedBids = state.selectedBids;

      let code_pannel =  state.codes_panel;
      if (currentBid.setBall(ball)){
         selectedBids.push(currentBid.clone());
         currentBid.clear();
         code_pannel = resetPannel(state.codes_panel);
      }

      return {...state, currentBid:currentBid, selectedBids:selectedBids, codes_panel:code_pannel}
    },

    delBid(state, action){
      let index = action.payload;
      let selectBids = state.selectedBids;
      selectBids.splice(index, 1);
      return {...state, selectBids:selectBids};
    },

    setBidCount(state, action){
       let {index, count} = action.payload;
       let selectBids = state.selectedBids;
       selectBids[index].setCount(count);
      return {...state, selectedBids:selectBids}
    },

    unSelectBall(state,action){
      let currentBid = state.currentBid;
      let codes_panel = state.codes_panel;
      let ball = action.payload;
      updatePannel(state.codes_panel, ball);
      currentBid.unSelectBall(ball);
      return {...state, currentBid:currentBid, codes_panel:codes_panel}
    },

    jiXuan(state,action){
      let selectedBids = [];
      let currentBid = state.currentBid;
      currentBid.clear();
      let code_pannel = resetPannel(state.codes_panel);

      let type = state.currentBid.type;
      for (let i = 0; i < state.totalCount; i++){
        selectedBids.push(new Bid(type, true));
      }
      return {...state, selectedBids, code_pannel, currentBid};

    }
  }
};
