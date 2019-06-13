/**
 *日期: 2019/5/21
 *作者: xiannvrong
 *功能:
 */
import React from 'react';
import { connect } from 'dva';
import styles from './page.css';
import router from 'umi/router';

class looseChange extends React.Component {

  render() {
    const { xtbTotalAmount } = this.props.store.accountInfo;

    return (
      <div className={styles.loose_change_wrapper}>
        <div className={styles.top_area}>
          <img src="http://qnimage.xiteng.com/assets_icon_xibi%20@2x.png" className={styles.rmb_icon}/>
          <div className={styles.money_text}>喜币</div>
          <div className={styles.amount_num}>
            <div className={styles.money_sum}>{xtbTotalAmount}</div>
          </div>
        </div>

        <div className={styles.go_choose_bank} onClick={() => {router.push('/wallet/billingDetails')}}>
          <div className={styles.bank_left}>
            <img src="http://qnimage.xiteng.com/lingqian_icon_yinhangka@2x.png" className={styles.bank_icon}/>
            <div className={styles.bank_text}>账单</div>
          </div>
          <div className={styles.bank_right}>
            <img src="http://qnimage.xiteng.com/nav_btn_back@2x.png" className={styles.next_icon}/>
          </div>
        </div>
       
        <div className={styles.footer_explain}>10喜币 = 1元</div>
      </div>
    );
  }
}

export default connect(state => ({
  store: state.wallet,
  loading: state.loading.global,
}))(looseChange);
