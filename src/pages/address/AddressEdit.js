import React from 'react';
import {connect} from 'dva';
import {List,Button,InputItem,Picker} from 'antd-mobile';
import { createForm } from 'rc-form';
import { district } from 'antd-mobile-demo-data';

class AddressEdit extends React.Component{

  onCreate = ()=>{
    this.props.form.validateFields((error, value) => {
      console.log(value);
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

    console.log('componentDidMount ',store);
  }

  render(){

    const { getFieldProps } = this.props.form;
    return <div>
      <InputItem
        {...getFieldProps('userName')}
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
        {...getFieldProps('addrDetail')}
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
