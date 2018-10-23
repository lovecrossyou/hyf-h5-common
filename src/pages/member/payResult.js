import React from 'react';
import { connect } from 'dva';
import { Result, Icon, WhiteSpace } from 'antd-mobile';
import DocumentTitle from 'react-document-title';
import styles from './page.css';


const Fail = () => {
  return (
    <Result
      img={<Icon type="cross-circle-o" className="spe" style={{ fill: '#cc2636' }}/>}
      title="支付失败"
      message=""
    />
  );
};

const Succ = () => {
  return (
    <Result
      img={<Icon type="check-circle" className="spe" style={{ fill: '#1F90E6' }}/>}
      title="支付成功!"
    />
  );
};

const payChannelFormat = (channel)=>{
  if(channel==='WeixinMiniProgramPay')return '微信支付' ;
  return '手机支付' ;
}


function vipPayResult(props) {
  console.log('payResult ', props.store.payResult);
  const payResultInfo = props.store.payResult ;
  if(payResultInfo===null)return null ;
  const {payChannel,payOrderNo,payResult,totalFee,tradeTime} = payResultInfo ;
  return (
    <DocumentTitle title='支付结果'>
      <div>
        {payResult!=="fail" ?(<Succ/>):(<Fail/>)}
        <WhiteSpace/>
        <div className={styles.footer}>
          <div className={styles.footer_item}>交易单号：{payOrderNo}</div>
          {/*<div className={styles.footer_item}>购买会员：铂金会员</div>*/}
          <div className={styles.footer_item}>支付金额：{totalFee/100}元</div>
          <div className={styles.footer_item}>支付方式：{payChannelFormat(payChannel)}</div>
          <div className={styles.footer_item}>交易时间：{tradeTime||'--'}</div>
        </div>
      </div>
    </DocumentTitle>
  );
}

export default connect(state => {
  return {
    store: state.member,
  };
})(vipPayResult);