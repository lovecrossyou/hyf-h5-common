/**
 *日期: 2019/5/6
 *作者: xiannvrong
 *功能:
 */
import React from 'react';
import { connect } from 'dva';
import styles from './page.css';
import router from 'umi/router';

class WithdrawChannel extends React.Component {

  render() {
    const { refundMount } = this.props.store.accountInfo;
    return (
      <div className={styles.withdraw_channel_wrapper}>
        <div className={styles.refund_area}>
          <div className={styles.left_content_area}>
            <img src="http://qnimage.xiteng.com/qianbao_btn_tuikuan@2x.png" className={styles.tui_icon}/>
            <div className={styles.refund_text}>退款</div>
            <div className={styles.refund_title}>不中签全额退款</div>
          </div>
          <div className={styles.right_content_area}>
            <div className={styles.money_num}>¥{refundMount / 100}</div>
            <img src="http://qnimage.xiteng.com/nav_btn_back@2x.png" className={styles.next_icon}/>
          </div>
          <div className={styles.red_circle}> </div>
        </div>
        <div className={styles.refund_area} onClick={() => {router.push('/wallet/looseChange')}}>
          <div className={styles.left_content_area}>
            <img src="http://qnimage.xiteng.com/qianbao_icon_lingqian@2x.png" className={styles.tui_icon}/>
            <div className={styles.refund_text}>零钱</div>
          </div>
          <div className={styles.right_content_area}>
            <div className={styles.money_num}>¥10.98</div>
            <img src="http://qnimage.xiteng.com/nav_btn_back@2x.png" className={styles.next_icon}/>
          </div>
        </div>
        <div className={styles.refund_area} onClick={() => {router.push('/wallet/xibiDetails')}}>
          <div className={styles.left_content_area}>
            <img src="http://qnimage.xiteng.com/assets_icon_xibi%20@2x.png" className={styles.tui_icon}/>
            <div className={styles.refund_text}>喜币</div>
          </div>
          <div className={styles.right_content_area}>
            <div className={styles.money_num}>
              <img src="http://qnimage.xiteng.com/assets_icon_xibi%20@2x%281%29.png" className={styles.xibi_icon}/>
              1014.98
            </div>
            <img src="http://qnimage.xiteng.com/nav_btn_back@2x.png" className={styles.next_icon}/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  store: state.wallet,
  loading: state.loading.global,
}))(WithdrawChannel);
