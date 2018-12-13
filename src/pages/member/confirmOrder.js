import React from 'react';
import { connect } from 'dva';
import { Modal, Button } from 'antd-mobile';
import DocumentTitle from 'react-document-title';

import styles from './page.css';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { Stepper } from '../lotteryselect/components/Stepper';


// 地址信息
const AddressContainer = ({data=null})=>{
  if(data==null){
    return <div className={styles.addr_container_empty}>
      + 请完善地址
    </div>
  }
  return <div className={styles.addr_container}>

  </div>
}

// 商品信息

const ProductInfo = ()=>{
  return <div className={styles.product_info_wrapper}>
    <div  className={styles.product_info_img}></div>
    <div className={styles.product_info_des}>
      <div className={styles.product_info_des_title}>小米(M1)AI 音响蓝牙Wi-Fi喜哦啊爱同学</div>
      <div className={styles.product_info_des_price}>¥369</div>
    </div>


  </div>
}

const BuyCountWrapper = ({onChange,number})=>{
  return (
    <div className={styles.step_wrapper}>
      <div>
        抢购份数
      </div>
      <Stepper
        value={number}
        onChange={v=>{
          onChange&&onChange(v);
        }}/>
    </div>
  )
}

const BuyFooter = ()=>{
  return <div className={styles.footer_wrapper}>
    <div className={styles.footer_wrapper_left}>
      <div>共1份</div>
      <div className={styles.footer_wrapper_left_mid}>实付款：</div>
      <div className={styles.footer_wrapper_left_price}>¥369</div>
    </div>

    <div className={styles.footer_wrapper_right}>
      提交订单
    </div>
  </div>
}

class VIPConfirmOrder extends React.Component{

  state = {
    number:1
  }

  render(){
    return <DocumentTitle title='购买会员'>
      <div className={styles.order_confirm_container}>
        <AddressContainer/>
        <ProductInfo/>
        <BuyCountWrapper
          number={this.state.number}
          onChange={v=>{
            this.setState({
              number:v
            })
          }}/>
        <BuyFooter/>
      </div>
    </DocumentTitle>
  }
}

export default connect()(VIPConfirmOrder)

