import React from 'react';
import {connect} from 'dva';
import {List,Button,InputItem,Picker,Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
import {routerRedux} from 'dva/router';
import commonCityData from '../../utils/city'
import {ActivityIndicator} from "../../components/ActivityIndicator";


class AddressEdit extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      commonCityData:[]
    }
  }


  onCreate = ()=>{
    this.props.form.validateFields((error, value) => {
      let phoneNum = value.phoneNum ;
      if(phoneNum===undefined){
        Toast.show('请输入正确的手机号！');
        return;
      }
      phoneNum = phoneNum.replace(/\s+/g,"") ;
      if(phoneNum.length!==11){
        Toast.show('请输入正确的手机号！');
        return;
      }


      const districtAddress = value.districtAddress.join('') ;
      const detailAddress = value.detailAddress ;
      if(detailAddress===undefined||detailAddress.length===0){
        Toast.show('请完善详细地址！');
        return;
      }
      const params = {
        phoneNum: phoneNum,
        recievName: value.recievName,
        detailAddress: detailAddress,
        districtAddress: districtAddress,
        fullAddress: districtAddress + detailAddress,
        isDefault: 1,
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


  convertCity = data=>{
    const obj = {} ;
    obj.label = data.name ;
    obj.value = data.name ;

    if(data.cityList&&data.cityList.length!=0){
      obj.children = this.convertCityData(data.cityList) ;
    }
    if(data.districtList&&data.districtList.length!=0){
      obj.children = this.convertCityData(data.districtList) ;
    }
    return obj ;
  }


  convertCityData = oldData=>{
    const array = [] ;
    for(let d of oldData){
      array.push(this.convertCity(d));
    }
    return array;
  }



  componentDidMount(){
    const cityData = commonCityData.cityData ;
    const array = this.convertCityData(cityData) ;
    this.setState({
      commonCityData:array
    })


    const store = this.props.store ;

    console.log('store ',store)
    if(store.activeAddress!=null){
      const editAddress = store.activeAddress ;
      this.props.form.setFieldsValue({
        recievName:editAddress.recievName,
        phoneNum:editAddress.phoneNum,
      })
    }
  }

  render(){

    const { getFieldProps } = this.props.form;
    const {loading} = this.props ;
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
              data={this.state.commonCityData}
              title="请选择"
              {...getFieldProps('districtAddress', {
                initialValue: ['请选择地区', '', ''],
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

      <div style={{margin:'auto',marginTop:'40px',width:'95%'}}>
        <Button  type="warning"  onClick={this.onCreate}>确认添加</Button>
      </div>
      <ActivityIndicator toast text="正在加载" animating={loading}/>
    </div>
  }
}

const EditAddressWrapper = createForm()(AddressEdit);


export default connect(state=>({
  store:state.address,
  loading:state.global.loading
}))(EditAddressWrapper);
