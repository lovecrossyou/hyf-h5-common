import React from 'react';
import { connect } from 'dva';
import styles from './page.css';
import { Button } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import rmbimg from '../../assets/renminbi.png';

function RmbContainerView (props) {
    const {rmbAmount,canWithdrawRmb} = props.store.accountInfo;
    return(
      <div>
        <div className={styles.rmbMainContainer}>
          <img className={styles.rmbMainContainer_amountOfImage} src={rmbimg} alt=""/>
          <div className={styles.rmbMainContainer_price}>金额</div>
          <div className={styles.rmbMainContainer_price_gold}>￥<big>{rmbAmount/100}</big></div>
          <div className={styles.rmbMainContainer_price}>可提现:<span>￥{canWithdrawRmb/100}</span></div>
        </div>
        <div className='rmbMainContainer_btn' onClick={() => { routerRedux.push('/wallet/withdrawDeposits')}}>
          <Button>提现</Button>
        </div>
        <div className={styles.rmbFooter}>
          总金额包含参与3D抢购的退款金额和会员奖励，3D抢购退款金额可直接提现，会员奖励需升级为会员方可提现。
          <span className={styles.upqradeYourAccount} onClick={()=>{
            props.dispatch(routerRedux.push('/member/page'))
          }}>升级会员>></span>
        </div>
      </div>
    )
}

export default connect(state => ({
  store: state.wallet
}))(RmbContainerView);
