import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import styles from './page.css';
import { List, InputItem, Button , Picker , WingBlank ,Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router';

function addBankCard(props){
  console.log(11111,props.store);
  const { bankNameList , bankdatavalue } = props.store;
  const { getFieldProps } = props.form;
  return(
    <DocumentTitle title='添加银行卡'>
        <div className={styles.add_bank_card_container}>
            <div className={styles.add_bank_card_container_list}>
              <InputItem
                {...getFieldProps('cardholder')}
                type="name"
                placeholder="请填写持卡人姓名" >持卡人 ：</InputItem>

              <InputItem
                {...getFieldProps('bankCardNumber', {
                })}
                type="bankCard"
                placeholder="请填写银行卡卡号"
              >银行卡</InputItem>

              <Picker
                extra="请选择"
                title="银行名称 ："
                {...getFieldProps('bankCardKind')}
                data={bankNameList}
                cols={1}
                className={styles.forss}
                onOk={(val)=>{
                }} >
                <List.Item arrow="horizontal">银行类型</List.Item>
              </Picker>
              <InputItem
                {...getFieldProps('openAccountbranch')}
                type="name" placeholder="请填写开户支行名称" >开户支行 ：</InputItem>
            </div>
          <WingBlank>
            <Button
              style={{background:"#e02f42",color:"#FFFFFF"}}
              onClick={()=>{
                props.form.validateFields((error, value) => {
                  console.log(error, value);

                  const {cardholder,bankCardNumber,bankCardKind,openAccountbranch} = value ;

                  if(cardholder===undefined){
                    Toast.show('请输入持卡人姓名');
                    return ;
                  }

                  if(bankCardNumber===undefined){
                    Toast.show('请输入卡号');
                    return ;
                  }

                  if(bankCardKind===undefined){
                    Toast.show('请选择银行卡类型');
                    return ;
                  }

                  if(openAccountbranch===undefined) {
                    Toast.show('请输入开支行');
                    return;
                  }

                  const params = {
                    cardholder,
                    bankCardNumber,
                    bankCardKind:bankCardKind[0],
                    openAccountbranch
                  }

                  props.dispatch({
                    type:"bank/saveBankInfo",
                    payload:params
                  })
                  props.dispatch(routerRedux.push('/bank/checkPhoneNum'))

                });
              }}>下一步</Button>
          </WingBlank>
        </div>
    </DocumentTitle>
  )
}

const addBankCardWrapper = createForm()(addBankCard);

export default connect(state => ({
  store:state.bank
}))(addBankCardWrapper);
