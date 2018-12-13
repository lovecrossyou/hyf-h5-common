import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import styles from './page.css';
import {ActivityIndicator} from "../../components/ActivityIndicator";
import { Button,WingBlank,Flex } from 'antd-mobile';
import icon_bank from '../../assets/bank.png';
import { routerRedux } from 'dva/router';


// bankName: "中国农业银行"
// bgColor: "#149b7b"
// big_icon: "http://123.57.161.212:8080/group1/M00/00/53/ezmh1FszW7yAOfp_AAB70gwXdpo018.png"
// branchAddress: null
// cardholder: "2424"
// endCardCode: "2424"
// openAccountbranch: "2424"
// small_icon: "http://12

const BankItem = ({data})=>{
  console.log('data ',data)
  return (<div>
    <div className={styles.bank_wrapper} style={{backgroundColor:data.bgColor}}>
      <div direction='row' align='center'>
        <img src={data.big_icon} alt="" className={styles.icon_bank}/>
        <div>
          <div>{data.bankName}</div>
          <div>储蓄卡</div>
        </div>
      </div>
      <div className={styles.bank_footer} style={{backgroundColor:data.bgColor}}>
        <div>**** **** **** {data.endCardCode}</div>
      </div>
    </div>

  </div>);
}

function BankView(props){
  const {bankCardList} = props.store ;
  return(
    <DocumentTitle title='银行卡号'>
      <div>
        <ActivityIndicator
          color="white"
          toast
          animating={props.loading}
        />

        {
          bankCardList.map((bank,index)=>{
            return <BankItem data={bank} key={'#'+index}/>
          })
        }
        {
          bankCardList.length===0?(<div className={styles.no_bank_card_container}>
            <img src={icon_bank} alt=""/>
            <div className={styles.no_bank_card_container_anyone}>你还未添加任何银行卡</div>
            <div className={styles.no_bank_card_container_rapid}>点击这里迅速绑卡</div>
            <div className={styles.no_bank_card_container_btn} onClick={()=>{
              props.dispatch(routerRedux.push('/bank/addBankCard'))
            }}>+添加银行卡</div>
          </div>):null
        }
      </div>
    </DocumentTitle>
  )
}
export default connect(state => ({
  store:state.bank,
  loading:state.loading.global
}))(BankView);

















