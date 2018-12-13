import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import styles from './page.css';
import {ActivityIndicator} from "../../components/ActivityIndicator";
import { Button } from 'antd-mobile';
import icon_bank from '../../assets/bank.png';
import { routerRedux } from 'dva/router';


import { List, InputItem, WhiteSpace , WingBlank} from 'antd-mobile';
import { createForm } from 'rc-form';

const COUNT = 5;
class CheckPhoneNumView extends React.Component{
  state={
     count:COUNT
  };
  checkCount(){
    if(this.state.count === COUNT){
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

  }
  render(){
    const { getFieldProps } = this.props.form;
    return(
      <DocumentTitle title='验证手机号'>
        <div>
          <List renderHeader={() => 'Format'}>
            <InputItem
              {...getFieldProps('phone')}
              type="phone"
              placeholder="请填写在银行预留手机号"
            >手机号码：</InputItem>
            <div className={styles.check_phone_container}>
              <InputItem
                {...getFieldProps('checkCode')}
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
                        console.log(error, value);

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

}))(CheckPhoneNumViewWrapper);


