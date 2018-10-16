import { connect } from 'dva';
import { Stepper, ListView } from 'antd-mobile';

import styles from './page.css';
import { LotteryBall } from './components/LotteryBall';

const Tips3D = '选号规则与福彩3D相同，选择号码与当期开奖号码对应位置的号码相同，即中签。';
const TipsDOUBLE = '请选择6个红色球号码，1个蓝色球号码，中签号码以福彩双色球开奖结果为准。';

const OptionPanel = ({ restCount, jiXuan }) => {
  return <div className={styles.opt_panel}>
    <div>
      您可选择 <span style={{ color: '#cc2636' }}>{restCount}组</span> 抽签号码
    </div>
    <BtnJiXuan onClick={jiXuan}/>
  </div>;
};

const NumberGroup = ({ balls, onClick }) => {
  console.log('balls ###', balls);
  return <div className={styles.nos_balls}>
    {
      balls.map((ball, index) => {
        return <LotteryBall onClick={onClick} ball={ball} key={index + '#'}/>;
      })
    }
  </div>;
};

// 一组号码
const SingleNumberPanel = ({ bid, restCount, onClick, hideStepper, onChange, delClick }) => {
  console.log('restCount ', restCount, 'buyCount', bid.buyCount);
  return <div className={styles.nos}>
    <div className={styles.leftWrapper}>
      {
        hideStepper == undefined ? (<div className={styles.delBtn} onClick={delClick}>x</div>) : (
          <div className={styles.delBtn}/>)
      }
      <NumberGroup onClick={onClick} balls={bid.balls}/>
    </div>
    <div>
      {
        hideStepper == undefined ? (<Stepper
          style={{ width: '300px' }}
          onChange={onChange}
          showNumber
          min={1}
          max={bid.buyCount + restCount}
          defaultValue={bid.buyCount}
        />) : null
      }
    </div>
  </div>;
};

// 已选号码
const LotteryNos = ({ bidCmpleteFlag, restCount, selectedBids, currentBid, onClick, onChange, delClick }) => {

  console.log('selectedBids ', selectedBids);
  console.log('currentBid ', currentBid);


  return <div className={styles.no_group}>
    {
      selectedBids.map((bid, index) => {
        return <SingleNumberPanel
          delClick={() => {
            delClick(index);
          }}
          restCount={restCount}
          onChange={(count) => {
            onChange(count, index);
          }}
          bid={bid}
          key={index + '#'}/>;
      })
    }
    {
      bidCmpleteFlag ? null : (<SingleNumberPanel
        hideStepper
        onClick={onClick}
        bid={currentBid}/>)
    }

  </div>;
};

// 机选按钮
const BtnJiXuan = ({ onClick }) => {
  return <div onClick={onClick} className={styles.jixuan}>全部机选</div>;
};

// 福彩3D 选号面板
const SelectPanel3D = ({ codes }) => {
  return <div className={styles.select_panel}>
    <div className={styles.tips}>{Tips3D}</div>
    <div className={styles.wrapper_3d}>
      <div className={styles.all_ball}>
        <LotteryBall text='0'/>
        <LotteryBall text='1'/>
        <LotteryBall text='2'/>
        <LotteryBall text='3'/>
        <LotteryBall text='4'/>
      </div>
      <div className={styles.all_ball}>
        <LotteryBall text='5'/>
        <LotteryBall text='6'/>
        <LotteryBall text='7'/>
        <LotteryBall text='8'/>
        <LotteryBall text='9'/>
      </div>
    </div>

    <div className={styles.btn_confirm}>
      确认
    </div>
  </div>;
};

// 福彩双色球 选号面板
const SelectPanelFuCai = ({ bidCompleteFlg, currentBid, balls, onClick, confirmBids }) => {
  return <div className={styles.select_panel}>
    <div className={styles.tips}>{TipsDOUBLE}</div>
    <div className={styles.wrapper_3d}>
      <div className={styles.all_ball}>
        {
          balls.map((c, index) => {
            return <LotteryBall onClick={() => {
              if (bidCompleteFlg) return;
              if (c.color === 'red') {
                if (currentBid.type === '3d'
                  && currentBid.red_selectCount === 3) {
                  return;
                }
                if (currentBid.type !== '3d'
                  && currentBid.red_selectCount === 6) {
                  return;
                }
              } else {
                if (currentBid.blue_selectCount === 1) {
                  return;
                }
              }
              onClick(c);
            }} ball={c} key={index + '#'}/>;
          })
        }
      </div>
    </div>

    <div
      onClick={() => {
        if (bidCompleteFlg) {
          confirmBids();
        }
      }}
      className={styles.btn_confirm} style={{ opacity: bidCompleteFlg ? 1 : 0.3 }}>
      确认
    </div>
  </div>;
};

function calcBidCount(bids) {
  let result = 0;
  for (let bid of bids) {
    result += bid.buyCount;
  }
  return result;
}

const LotterySel = (props) => {
  console.log('store ', JSON.stringify(props.store));

  const restCount = props.store.totalCount - calcBidCount(props.store.selectedBids);
  const bidCmpleteFlag = restCount === 0;
  return (
    <div className={styles.container}>
      {/*菜单面板*/}
      <OptionPanel
        jiXuan={() => {
          props.dispatch({
            type: 'lotteryselect/jiXuan',
          });
        }}
        restCount={restCount}/>
      {/*已选号码*/}
      <LotteryNos
        delClick={index => {
          props.dispatch({
            type: 'lotteryselect/delBid',
            payload: index,
          });
        }}
        restCount={restCount}
        onChange={(count, index) => {
          props.dispatch({
            type: 'lotteryselect/setBidCount',
            payload: { count, index },
          });
        }}
        bidCmpleteFlag={bidCmpleteFlag}
        onClick={(ball) => {
          props.dispatch({
            type: 'lotteryselect/unSelectBall',
            payload: ball,
          });
        }}
        currentBid={props.store.currentBid}
        selectedBids={props.store.selectedBids}/>
      {/*选号面板*/}
      <SelectPanelFuCai
        confirmBids={() => {
          console.log('xxxxx');
        }}
        bidCompleteFlg={bidCmpleteFlag}
        onClick={(ball) => {
          console.log('ball ', ball);
          props.dispatch({
            type: 'lotteryselect/selectBall',
            payload: ball,
          });
        }}
        currentBid={props.store.currentBid}
        balls={props.store.codes_panel}/>
    </div>
  );
};

export default connect(state => {
  return {
    store: state.lotteryselect,
  };
})(LotterySel);
