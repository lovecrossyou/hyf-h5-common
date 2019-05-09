/**
 *日期: 2019/5/6
 *作者: xiannvrong
 *功能:
 */
import React from 'react';
import { connect } from 'dva';
import styles from './page.css';
import router from "umi/router";

class WithdrawChannel extends React.Component {

  render() {
    const {refundMount} = this.props.store.accountInfo;

    return (
      <div className={styles.withdraw_channel_wrapper}>
        <div className={styles.purchase_way}>
          <div className={styles.content_left}>
            <img src="http://qnimage.xiteng.com/tixian_icon_rmb@2x.png" alt="" className={styles.rmb_icon}/>
            <div className={styles.withdraw_withdraw}>
              <div className={styles.symbol}>¥</div>
              {refundMount/100}
            </div>
            <div className={styles.withdraw_way}>抢购退款</div>
          </div>
          <button className={styles.withdraw_btn} onClick={() => { router.push('/wallet/withdrawDeposits')}}>提现</button>
        </div>
        <div className={styles.purchase_way}>
          <div className={styles.content_left}>
            <img src="http://qnimage.xiteng.com/tixian_icon_rmb@2x.png" alt="" className={styles.rmb_icon}/>
            <div className={styles.withdraw_withdraw}>
              <div className={styles.symbol}>¥</div>
              0.00
            </div>
            <div className={styles.withdraw_way}>会员奖励</div>
          </div>
          <button className={styles.withdraw_btn}>提现</button>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  store: state.wallet,
  loading: state.loading.global,
}))(WithdrawChannel);
