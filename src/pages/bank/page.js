import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import styles from './page.css';
import {ActivityIndicator} from "../../components/ActivityIndicator";
import { Button } from 'antd-mobile';
import icon_bank from '../../assets/bank.png';
import { routerRedux } from 'dva/router';

function BankView(props){
  return(
    <DocumentTitle title='银行卡号'>
      <div>
        <ActivityIndicator
          color="white"
          toast
          animating={props.loading}
        />
        <div className={styles.no_bank_card_container}>
          <img src={icon_bank} alt=""/>
          <div className={styles.no_bank_card_container_anyone}>你还未添加任何银行卡</div>
          <div className={styles.no_bank_card_container_rapid}>点击这里迅速绑卡</div>
          <div className={styles.no_bank_card_container_btn} onClick={()=>{
            props.dispatch(routerRedux.push('/bank/addBankCard'))
          }}>+添加银行卡</div>
        </div>
      </div>
    </DocumentTitle>
  )
}
export default connect(state => ({


}))(BankView);

















