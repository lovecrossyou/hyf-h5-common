import React from 'react';
import { connect } from 'dva';
import {InputItem ,Button,ActivityIndicator} from 'antd-mobile';
import { routerRedux } from 'dva/router';


class SetName extends React.Component{
  constructor(props){
    super(props);
    this.cnName = '' ;
  }

  render(){
    return (
      <div >
        <ActivityIndicator
          toast
          animating={this.props.loading}/>
        <InputItem placeholder='输入新名字' onChange={(value)=>{
          this.cnName = value ;
        }}/>
        <div>
          <Button onClick={()=>{
            this.props.dispatch({
              type:'personInfo/setName',
              payload:{
                cnName:this.cnName
              },
              cb:()=>{
                this.props.dispatch(routerRedux.goBack());
              }
            })
          }}>确定</Button>
        </div>
      </div>
    );
  }
}

export default connect(state=>{
  return {
    loading:state.loading.global
  }
})(SetName);

