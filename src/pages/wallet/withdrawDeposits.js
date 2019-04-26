/**
 *日期: 2019/4/26
 *作者: xiannvrong
 *功能:
 */
import React from 'react';
import { connect } from 'dva';
import styles from './page.css';


const WithdrawOperation = ({goWithdraw}) => {

  return(
    <div className={styles.withdraw_deposit_wrapper}>
      <div className={styles.withdraw_deposit_sum}>
        <div className={styles.left_text}>提现金额：</div>
        <input type="text" placeholder="填写提现金额"/>
      </div>
      <div className={styles.all_withdraw_deposit}>
        <div className={styles.withdraw_num}>可提现余额xx元，</div>
        <div className={styles.all_text}>全部提现</div>
      </div>

      <div className={styles.withdraw_deposit_btn} onClick={goWithdraw}><button>提现</button></div>

    </div>
  )
};

const BankInfo = ({bank,goWithdraw}) => {
  return (
    <div>
      <div className={styles.choose_bank}>
        <div className={styles.bank_img}><img src={bank.small_icon} alt=""/></div>
        <div className={styles.bank_name}>{bank.bankName}( {bank.endCardCode} )</div>
        <div className={styles.next_icon}><img src="http://qnimage.xiteng.com/right_icon@2x.png" alt=""/></div>
      </div>
      <WithdrawOperation goWithdraw={goWithdraw}/>
    </div>

  );
};

function withdrawDeposits (props) {
  const bankList = props.store.bankList;
  const withdrawOption = props.store.withdrawOption;
  console.log('withdrawOption ',withdrawOption);
  if (bankList.length === 0){
    return <div className={styles.choose_bank}>+ 添加银行卡</div>
  }
  else {
    return <BankInfo bank={bankList[0]} goWithdraw={()=>{

      props.dispatch({
        type:"wallet/withDraw",
        payload:{
          bankCardId:11111111111,
          mount:11,
          payPassword:"111111",
          type:"refundRmbWithDraw "
        }
      })
    }
    } />
  }
  return(
    <div className={styles.withdraw_deposit_wrapper}>

    </div>
  )
}


export default connect(state => ({
  store: state.wallet
}))(withdrawDeposits);
