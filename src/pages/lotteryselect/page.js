import { connect } from 'dva';

import styles from './page.css';
import { LotteryBall } from './components/LotteryBall';
import { Stepper } from './components/Stepper';
import DocumentTitle from 'react-document-title';


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
  // console.log('balls ###', balls);
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

  const leftWrapperStyle = bid.type === '3d' ? styles.leftWrapper45 : styles.leftWrapper;

  const EmptyNumberPanel = () => {
    return (<div className={styles.nos}>
      <div className={leftWrapperStyle}>
        <div className={styles.delBtn_wrapper}/>
        <NumberGroup onClick={onClick} balls={bid.balls}/>
      </div>
      <div className={styles.stepperClear}/>
    </div>);
  };
  const NormalNumberPanel = () => {
    return (
      <div className={styles.nos}>
        <div className={leftWrapperStyle}>
          <div className={styles.delBtn_wrapper}>
            <div className={styles.delBtn} onClick={delClick}>x</div>
          </div>
          <NumberGroup onClick={onClick} balls={bid.balls}/>
        </div>

        <div className={styles.stepper}>
          <Stepper
            onChange={onChange}
            min={1}
            max={bid.buyCount + restCount}
            value={bid.buyCount}
          />
        </div>
      </div>
    );
  };
  if (hideStepper === undefined) return <NormalNumberPanel/>;
  return <EmptyNumberPanel/>;
};

// 已选号码
const LotteryNos = ({ bidCmpleteFlag, restCount, selectedBids, currentBid, onClick, onChange, delClick }) => {

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

const COLUMN = 9;

const GeneRowItems = ({ rowItems, numsOfRow }) => {
  if (numsOfRow != COLUMN) {
    return (<div className={styles.rowWrapper_no_center}>
      {rowItems}

    </div>);
  }
  else {
    return (<div className={styles.rowWrapper}>
      {rowItems}
    </div>);
  }
};

// 福彩双色球 选号面板
const SelectPanelFuCai = ({ bidCompleteFlg, currentBid, balls, onClick, confirmBids }) => {
  const rows = Math.ceil(balls.length / COLUMN);
  let allRowItems = [];
  const numsOfRow = COLUMN;

  for (let i = 0; i < rows; i++) {
    // const numsOfRow = calRowCount(i,balls.length) ;
    let rowItems = [];
    for (let j = 0; j < numsOfRow; j++) {
      const ballIndex = i * COLUMN + j;
      const c = balls[ballIndex];
      rowItems.push(<LotteryBall onClick={() => {
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
      }} ball={c} key={i + '#' + j}/>);
    }
    allRowItems.push(<GeneRowItems key={'#' + i} rowItems={rowItems} numsOfRow={numsOfRow}/>);
  }

  return <div className={styles.panel_wrapper}>
    <div className={styles.sepline}/>

    <div className={styles.select_panel}>
      <div className={styles.tips}>{TipsDOUBLE}</div>
      <div className={styles.wrapper_3d}>
        {allRowItems}
      </div>
    </div>
    <div
      onClick={() => {
        if (bidCompleteFlg) {
          confirmBids();
        }
      }}
      className='lottery_btn_confirm' style={{ opacity: bidCompleteFlg ? 1 : 0.3 }}>
      确认
    </div>

  </div>
    ;
};

function calcBidCount(bids) {
  let result = 0;
  for (let bid of bids) {
    result += bid.buyCount;
  }
  return result;
}

const LotterySel = (props) => {
  // console.log('store ', JSON.stringify(props.store));

  const restCount = props.store.totalCount - calcBidCount(props.store.selectedBids);
  const bidCmpleteFlag = restCount === 0;
  return (
    <DocumentTitle title={props.title}>
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

        <div className={styles.content}>
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
              // console.log('xxxxx');
            }}
            bidCompleteFlg={bidCmpleteFlag}
            onClick={(ball) => {
              // console.log('ball ', ball);
              props.dispatch({
                type: 'lotteryselect/selectBall',
                payload: ball,
              });
            }}
            currentBid={props.store.currentBid}
            balls={props.store.codes_panel}/>
        </div>

      </div>
    </DocumentTitle>
  );
};

export default connect(state => {
  return {
    store: state.lotteryselect,
    title:state.global.text
  };
})(LotterySel);
