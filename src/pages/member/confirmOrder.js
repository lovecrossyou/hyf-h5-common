import React from 'react';
import { connect } from 'dva';
import { Modal, Button,Icon } from 'antd-mobile';
import DocumentTitle from 'react-document-title';
import { routerRedux } from 'dva/router';

import styles from './page.css';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { Stepper } from '../lotteryselect/components/Stepper';


// 地址信息
const AddressContainer = ({data=null,goAddressList})=>{
  console.log(' data ',data);
  if(data==null){
    return <div className={styles.addr_container_empty} onClick={goAddressList}>
      + 请完善地址
    </div>
  }
  return <div className={styles.addr_container} onClick={goAddressList}>
    <div className={styles.personage_info}>
      <div>收货人：{data.recievName}</div>
      <div>{data.phoneNum}</div>
    </div>
    <div className={styles.personage_address}>
      <div>收货地址: {data.fullAddress}</div>
    </div>

    <div className={styles.right_icon}>
      <Icon type='right' color='#999'/>
    </div>
  </div>
};

// 商品信息

const ProductInfo = ({data=null,totalAmount})=>{
  console.log('ProductInfo ',data);
  if(data==null)return null;
  return <div className={styles.product_info_wrapper}>
    <img src={data.imageUrl} alt=""  className={styles.product_info_img}/>
    <div className={styles.product_info_des}>
      <div className={styles.product_info_des_title}>{data.productName}</div>
      <div className={styles.product_info_des_price}>¥{data.price/100}</div>
    </div>


  </div>
};

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
};

const ProductSum = ({totalAmount})=>{
  return <div>
    <div className={styles.product_sum_wrapper}>
      <div className={styles.product_sum_text}>商品金额</div>
      <div className={styles.product_sum_num}>¥{totalAmount}</div>
    </div>
    <div className={styles.product_freight_wrapper}>
      <div className={styles.product_sum_text}>运费</div>
      <div className={styles.product_sum_num}>+¥0.00</div>
    </div>
  </div>
};

const BuyFooter = ({buyCount=1,totalAmount=0})=>{
  return <div className={styles.footer_wrapper}>
    <div className={styles.footer_wrapper_left}>
      <div>共{buyCount}份</div>
      <div className={styles.footer_wrapper_left_mid}>实付款：</div>
      <div className={styles.footer_wrapper_left_price}>¥{totalAmount}</div>
    </div>

    <div className={styles.footer_wrapper_right}>
      提交订单
    </div>
  </div>
};

class VIPConfirmOrder extends React.Component{

  state = {
    number:1
  };


  componentWillMount(){
    this.props.dispatch({
      type:'member/saveBuyCount',
      payload:1
    })
  }

  updateAmount = count=>{
    this.props.dispatch({
      type:'member/saveBuyCount',
      payload:count
    })
  }

  render(){
    const {activeAddress} = this.props.addrStore ;
    const {activeProduct,totalAmount,buyCount} = this.props.memberStore ;

    return <DocumentTitle title='购买会员'>
      <div className={styles.order_confirm_container}>
        <AddressContainer
          goAddressList={()=>{
            this.props.dispatch(routerRedux.push('/address/page'))
          }}
          data={activeAddress}/>
        <ProductInfo data={activeProduct} />
        <BuyCountWrapper
          number={this.state.number}
          onChange={v=>{
            this.setState({
              number:v
            })
            this.updateAmount(v);
          }}/>
        <ProductSum totalAmount={totalAmount}/>
        <BuyFooter totalAmount={totalAmount} buyCount={buyCount}/>
      </div>
    </DocumentTitle>
  }
}

export default connect(state=>{
  return {
    memberStore:state.member,
    addrStore:state.address,
  }
})(VIPConfirmOrder)

