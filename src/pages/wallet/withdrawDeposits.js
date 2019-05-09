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
    this.props.mountChange(data);
  }

  render() {
    return (
      <div className={styles.withdraw_deposit_wrapper}>
        <div className={styles.withdraw_deposit_sum}>
          <div className={styles.left_text}>提现金额：</div>
          <InputItem type="text" defaultValue={this.props.mount} placeholder="填写提现金额" onChange={this.onChange.bind(this)} />
        </div>
        {/* <div className={styles.all_withdraw_deposit}>
          <div className={styles.withdraw_num}>可提现余额xx元，</div>
          <div className={styles.all_text}>全部提现</div>
        </div> */}
        {/* setPayPwd */}
        
        {
          this.props.setPayPwd? (<div className={styles.withdraw_deposit_btn} onClick={this.props.goWithdraw}><button>提现</button></div>):(<div className='withdraw_setpwd_btn'>提现</div>)
        }
      </div>
    )
  }
}


const BankInfo = ({ bank, goWithdraw, mount, mountChange,setPayPwd }) => {
  return (
    <div>
      <div className={styles.choose_bank} onClick={() => {
        router.push('/bank/page');
      }}>
        <div className={styles.bank_img}><img src={bank.small_icon} alt="" /></div>
        <div className={styles.bank_name}>{bank.bankName}( {bank.endCardCode} )</div>
        <div className={styles.next_icon}><img src="http://qnimage.xiteng.com/right_icon@2x.png" alt="" /></div>
      </div>
      <WithdrawOperation setPayPwd={setPayPwd} mountChange={mountChange} mount={mount} goWithdraw={goWithdraw} />


      <div className='forgetPassword_btn'>
        忘记支付/提现密码?
      </div>
    </div>

  );
};

class withdrawDeposits extends React.Component {

  state = {
    mount: '',
    setPayPwd:true
  }


  componentDidMount(){
    this.props.dispatch({
      type: "wallet/checkSetPayPassword",
      payload: {},
      cb:res=>{
        if(res === false){
          Toast.info('需要设置提现密码', 4);
        }
        this.setState({setPayPwd:res});
      }
    })
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
        if(res.status === 500){
          Toast.info(res.message, 2);
        }
        else{
          Toast.info("提现申请已提交", 2);
        }
      }
    })
  }

  render() {
    const activeBank = this.props.activeBank;
    if (activeBank === null) {
      return <div>
        <div
        className={styles.choose_bank}
        onClick={() => {
          router.push('/bank/page');
        }}>+ 添加银行卡</div>
        <div className='forgetPassword_btn'>
        忘记支付/提现密码?
      </div>
      </div>  
    }
    else {
      return <BankInfo
        mountChange={mount => {
          this.setState({ mount });
        }}
        setPayPwd={this.state.setPayPwd}
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
