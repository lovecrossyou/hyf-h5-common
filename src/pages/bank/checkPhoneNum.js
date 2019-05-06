import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import styles from './page.css';
import {ActivityIndicator} from "../../components/ActivityIndicator";
import { Button } from 'antd-mobile';
import icon_bank from '../../assets/bank.png';
import { routerRedux } from 'dva/router';


import { List, InputItem, Toast , WingBlank} from 'antd-mobile';
import { createForm } from 'rc-form';

const COUNT = 60;
class CheckPhoneNumView extends React.Component{

  state={
     count:COUNT
  };

  sendCheckCode = (phoneNum)=>{
    console.log('phoneNum ',phoneNum) ;
    this.props.dispatch({
      type:'bank/getCheckCode',
      payload:{
        phoneNum:phoneNum,
        codeType:'bindBankCard'
      }
    })
  }


  checkCount(){
    this.props.form.validateFields((error, value) => {
      let phoneNum = value.phoneNum ;
      if(phoneNum===undefined){
        Toast.show('请输入手机号')
        return;
      }

      phoneNum = phoneNum.replace(/\s+/g,"") ;
      if(phoneNum.length!==11){
        Toast.show('请输入正确的手机号！');
        return;
      }

      if(this.state.count === COUNT){
        // 发送验证码
        this.sendCheckCode(phoneNum);
        this.timer = setInterval(()=>{
          let count = this.state.count;
          count--;
          if(count < 0) {
            this.setState({
              count : COUNT
            });
            clearInterval(this.timer)
            return;
          }
          this.setState({
            count
          })
        },1000)
      }

    });
  }

  bindCard = params=>{
    this.props.dispatch({
      type:'bank/addBank',
      payload: params,
      cb:()=>{
        Toast.show('绑定成功！')
        this.props.dispatch(routerRedux.go(-2));
      }
    })
  }

  render(){
    const { getFieldProps } = this.props.form;
    return(
      <DocumentTitle title='验证手机号'>
        <div>
          <List renderHeader={() => '验证手机号'}>
            <InputItem
              {...getFieldProps('phoneNum')}
              type="phone"
              placeholder="请填写在银行预留手机号"
            >手机号码：</InputItem>
            <div className={styles.check_phone_container}>
              <InputItem
                {...getFieldProps('code')}
                placeholder="请填写验证码"
              >验证码：</InputItem>
              <div className={styles.check_phone} onClick={this.checkCount.bind(this)}>
                {this.state.count === COUNT?"获取验证码":this.state.count}
              </div>
            </div>
          </List>
          <WingBlank>
            <Button style={{background:"#e02f42",color:"#FFFFFF",marginTop:"100px"}}
                    onClick={()=>{
                      this.props.form.validateFields((error, value) => {
                        const {phoneNum,code} = value ;
                        const params = this.props.store.bankInfo ;
                        params.code = code;
                        const phone = phoneNum.replace(/\s+/g,"") ;
                        params.phoneNum = phone;
                        this.bindCard(params);
                      });
                    }}
            >完成</Button>
          </WingBlank>
        </div>
      </DocumentTitle>
    )
  }
}
const CheckPhoneNumViewWrapper = createForm()(CheckPhoneNumView);
export default connect(state => ({
  store:state.bank
}))(CheckPhoneNumViewWrapper);


