import React from 'react';
import {connect} from 'dva';
import {List,Button,InputItem,Picker} from 'antd-mobile';
import { createForm } from 'rc-form';
import { district } from 'antd-mobile-demo-data';
import {routerRedux} from 'dva/router';


class AddressEdit extends React.Component{

  onCreate = ()=>{
    this.props.form.validateFields((error, value) => {
      // const phoneNum =  value.phoneNum.replace(/\s+/g,' ');
      const params = {
        phoneNum: '13220168837',
        fullAddress: value.detailAddress,
        recievName: value.recievName,
        detailAddress: value.detailAddress,
        districtAddress: '粮科大厦三层',
        isDefault: 0,
      }
      this.props.dispatch({
        type:'address/create',
        payload:params,
        cb:()=>{
          this.props.dispatch(
            routerRedux.goBack()
          )
        }
      })
    });
  }


  componentDidMount(){
    const store = this.props.store ;
    if(store.active!=null){
      const editAddress = store.active ;
      this.props.form.setFieldsValue({
        userName:editAddress.userName,
        phoneNum:editAddress.phoneNum,
      })
    }
  }

  render(){

    const { getFieldProps } = this.props.form;
    return <div>
      <InputItem
        {...getFieldProps('recievName')}
        clear
        placeholder="收件人"
        ref={el => this.autoFocusInst = el}
      >收件人</InputItem>
      <InputItem
        {...getFieldProps('phoneNum')}
        clear
        type='phone'
        placeholder="电话号码"
        ref={el => this.autoFocusInst = el}
      >电话号码</InputItem>


      <Picker extra="省市区县"
              data={district}
              title="请选择"
              {...getFieldProps('district', {
                initialValue: ['340000', '341500', '341502'],
              })}
              onOk={e => console.log('ok', e)}
              onDismiss={e => console.log('dismiss', e)}
      >
        <List.Item arrow="horizontal">省市区县</List.Item>
      </Picker>
      <InputItem
        {...getFieldProps('detailAddress')}
        clear
        placeholder="详细地址"
        ref={el => this.autoFocusInst = el}
      >详细地址</InputItem>
      <InputItem
        {...getFieldProps('postcode')}
        clear
        placeholder="邮编"
        ref={el => this.autoFocusInst = el}
      >邮编</InputItem>


      <div style={{margin:'auto',marginTop:'40px',width:'95%'}}>
        <Button  type="warning"  onClick={this.onCreate}>确认添加</Button>
      </div>
    </div>
  }
}

const EditAddressWrapper = createForm()(AddressEdit);


export default connect(({address})=>({
  store:address,
}))(EditAddressWrapper);
