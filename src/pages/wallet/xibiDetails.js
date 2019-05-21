/**
 *日期: 2019/5/21
 *作者: xiannvrong
 *功能:
 */
import React from 'react';
import { connect } from 'dva';
import styles from './page.css';

class looseChange extends React.Component {

  render() {
    return (
      <div className={styles.loose_change_wrapper}>
        <div className={styles.top_area}>
          <img src="http://qnimage.xiteng.com/assets_icon_xibi%20@2x.png" className={styles.rmb_icon}/>
          <div className={styles.money_text}>喜币</div>
          <div className={styles.amount_num}>
            <div className={styles.money_sum}>88.00</div>
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
