/**
 *日期: 2019/4/26
 *作者: xiannvrong
 *功能:
 */
import React from 'react';
import { connect } from 'dva';
import router from "umi/router";
import { InputItem, Modal,Toast } from 'antd-mobile';
import styles from './page.css';
const prompt = Modal.prompt;

class WithdrawOperation extends React.Component {
  onChange(data) {
    console.log(data);
    this.props.mountChange(data);
  }

  render() {
    return (
      <div className={styles.withdraw_deposit_wrapper}>
        <div className={styles.withdraw_deposit_sum}>
          <div className={styles.left_text}>提现金额：</div>
          <InputItem type="number" defaultValue={this.props.mount} placeholder="填写提现金额" onChange={this.onChange.bind(this)} />
        </div>
        {/* <div className={styles.all_withdraw_deposit}>
          <div className={styles.withdraw_num}>可提现余额xx元，</div>
          <div className={styles.all_text}>全部提现</div>
        </div> */}
        <div className={styles.withdraw_deposit_btn} onClick={this.props.goWithdraw}><button>提现</button></div>
      </div>
    )
  }
}


const BankInfo = ({ bank, goWithdraw, mount, mountChange }) => {
  return (
    <div>
      <div className={styles.choose_bank} onClick={() => {
        router.push('/bank/page');
      }}>
        <div className={styles.bank_img}><img src={bank.small_icon} alt="" /></div>
        <div className={styles.bank_name}>{bank.bankName}( {bank.endCardCode} )</div>
        <div className={styles.next_icon}><img src="http://qnimage.xiteng.com/right_icon@2x.png" alt="" /></div>
      </div>
      <WithdrawOperation mountChange={mountChange} mount={mount} goWithdraw={goWithdraw} />
    </div>

  );
};

class withdrawDeposits extends React.Component {

  state = {
    mount: ''
  }

  withDraw(pwd) {
    const activeBank = this.props.activeBank;
    this.props.dispatch({
      type: "wallet/fetchWithDraw",
      payload: {
        bankCardId: activeBank.bankId,
        mount: parseFloat(this.state.mount)*100,
        payPassword: pwd,
        type: "refundRmbWithDraw"
      },
      cb:res=>{
        console.log('res#### ',res );
        Toast.info("提现申请已提交", 2);
      }
    })
  }

  render() {
    const activeBank = this.props.activeBank;
    if (activeBank === null) {
      return <div
        className={styles.choose_bank}
        onClick={() => {
          router.push('/bank/page');
        }}>+ 添加银行卡</div>
    }
    else {
      return <BankInfo
        mountChange={mount => {
          this.setState({ mount });
        }}
        mount={this.state.mount}
        bank={activeBank}
        goWithdraw={() => {
          prompt(
            '提现密码',
            '请输入提现密码',
            password => {
              this.withDraw(password);
            },
            'secure-number',
          )
        }
        } />
    }
  }
}

export default connect(state => ({
  store: state.wallet,
  activeBank: state.bank.activeBank
}))(withdrawDeposits);
