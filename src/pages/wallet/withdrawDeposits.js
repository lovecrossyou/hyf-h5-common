/**
 *日期: 2019/4/26
 *作者: xiannvrong
 *功能:
 */
import React from 'react';
import { connect } from 'dva';
import styles from './page.css';

function withdrawDeposits (props) {

  const bankList = props.store.bankList;
  console.log('bankList ',bankList);
  return(
    <div className={styles.withdraw_deposit_wrapper}>
      <div className={styles.choose_bank}>

      </div>
    </div>
  )
}


export default connect(state => ({
  store: state.wallet
}))(withdrawDeposits);
