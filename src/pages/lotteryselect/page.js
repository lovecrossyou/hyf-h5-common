import React from 'react';

import { connect } from 'dva';
import { LotteryBall } from './components/LotteryBall';
import { Stepper } from './components/Stepper';
import DocumentTitle from 'react-document-title';
import { Modal, List, Toast, ActivityIndicator, Button } from 'antd-mobile';
import {routerRedux} from 'dva/router';
import cheng_icon from '../../assets/lottery/icon_haoma_cheng@2x.png';



import { AddressCell } from './components/addressCell';

import { RED_COLOR } from './models/lotteryselect';


import styles from './page.css';

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
            <div className={styles.delBtn} onClick={delClick}>
              <img src={cheng_icon} />
            </div>
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
const SelectPanelFuCai = ({ bidCompleteFlg, currentBid, balls, onClick, confirmBids, type }) => {
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
        if (c.color === RED_COLOR) {
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
      <div className={styles.tips}>{type==='fucai'?TipsDOUBLE:Tips3D}</div>
      <div className={styles.wrapper_3d}>
        {allRowItems}
      </div>
    </div>
    <div
      // onClick={() => {
      //   if (bidCompleteFlg && type === 'fucai') {
      //     console.log('onClick  bidCompleteFlg', bidCompleteFlg, 'type ', type);
      //     confirmBids();
      //   }
      // }}
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

const AddressHeader = ({ confirm, cancel }) => {
  return <div id='AddressHeader' className={styles.address_header}>
    <div onClick={cancel}>取消</div>
    <div>地址选择</div>
    <div className='lottery_confirm_fucai'>确定</div>
  </div>;
};

const AddrList = ({ list, toggle, checkedAddressIndex }) => {
  return <div>
    {list.map((data, index) => <AddressCell
      toggle={() => {
        toggle(index, data);
      }}
      active={checkedAddressIndex === index}
      address={data}
      key={index + '#'}/>)}
  </div>;
};

const CreateAddressButton = ({ onClick }) => {
  return <div onClick={onClick} className={styles.btn_create_addr}>
    <div className={styles.addr_btn}>+ 新建地址</div>
  </div>;
};


class LotterySel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checkedAddressIndex: -1,
    };
  }

  showModal = () => {
    this.props.dispatch({
      type: 'lotteryselect/showModal',
    });
  };

  onClose = () => {
    this.props.dispatch({
      type: 'lotteryselect/hideModal',
    });
  };

  confirmAddress = () => {
    if (this.state.checkedAddressIndex === -1) {
      Toast.show('请选择地址', 1);
    }
    else {
      this.onClose();
    }
  };


  // 新建地址
  createAddress = ()=>{
   this.props.dispatch(routerRedux.push('/address/AddressEdit'))

  }

  render() {
    const { store, isLoading, address, title } = this.props;
    const restCount = store.totalCount - calcBidCount(store.selectedBids);
    const bidCmpleteFlag = restCount === 0;
    const bidType = store.type;
    console.log('bidType ', bidType);
    return (
      <DocumentTitle title={title}>
        <div className={styles.container}>
          <ActivityIndicator
            toast
            text="加载中"
            animating={isLoading}/>
          {/*菜单面板*/}
          <OptionPanel
            jiXuan={() => {
              this.props.dispatch({
                type: 'lotteryselect/jiXuan',
              });
            }}
            restCount={restCount}/>
          {/*已选号码*/}
          <div className={styles.content}>
            <LotteryNos
              delClick={index => {
                this.props.dispatch({
                  type: 'lotteryselect/delBid',
                  payload: index,
                });
              }}
              restCount={restCount}
              onChange={(count, index) => {
                this.props.dispatch({
                  type: 'lotteryselect/setBidCount',
                  payload: { count, index },
                });
              }}
              bidCmpleteFlag={bidCmpleteFlag}
              onClick={(ball) => {
                this.props.dispatch({
                  type: 'lotteryselect/unSelectBall',
                  payload: ball,
                });
              }}
              currentBid={store.currentBid}
              selectedBids={store.selectedBids}/>
            {/*选号面板*/}
            <SelectPanelFuCai
              type={bidType}
              confirmBids={this.showModal.bind(this)}
              bidCompleteFlg={bidCmpleteFlag}
              onClick={(ball) => {
                this.props.dispatch({
                  type: 'lotteryselect/selectBall',
                  payload: ball,
                });
              }}
              currentBid={store.currentBid}
              balls={store.codes_panel}/>
          </div>

          {/*弹出地址层*/}
          <Modal
            popup
            visible={store.showModal}
            onClose={this.onClose.bind(this)}
            animationType="slide-up"
          >
            <List renderHeader={() => <AddressHeader
              confirm={this.confirmAddress.bind(this)}
              cancel={() => {
                this.onClose();
              }}/>} className="popup-list">
              {
                address.list.length == 0 ? (<CreateAddressButton
                  onClick={this.createAddress.bind(this)}/>) : (<AddrList
                  toggle={(index, data) => {
                    this.setState({
                      checkedAddressIndex: index,
                    });
                    this.props.dispatch({
                      type: 'address/setActive',
                      payload: data,
                    });
                  }}
                  checkedAddressIndex={this.state.checkedAddressIndex}
                  list={address.list}
                />)
              }
            </List>
          </Modal>
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(state => {
  return {
    store: state.lotteryselect,
    address: state.address,
    title: state.global.text,
    isLoading: state.loading.global,
  };
})(LotterySel);
