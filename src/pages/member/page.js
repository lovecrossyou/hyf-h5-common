import React from 'react';
import { connect } from 'dva';
import { Modal, Button, Radio } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import styles from './page.css';
import { ActivityIndicator } from '../../components/ActivityIndicator';

const VIPHeader = ({userVipInfo})=>{

  console.log('userVipInfo ',userVipInfo)
  return <div>

  </div>
}

const BtnBuy = ()=>{
  return <div className={styles.btn_buy}>
    立即购买
  </div>
}



const ProductItem = ({data,onClick})=>{
  return <div
    className={styles.product}
    onClick={onClick}>
    <img src={data.imageUrl} className={styles.p_img} alt=""/>
    <div className={styles.p_info}>
      <div className={styles.p_info_title}>{data.productName}</div>
      <div className={styles.p_info_desc}>{data.subtitle}</div>
      <div className={styles.p_info_price}>￥{data.price/100}</div>
    </div>
    <div className={styles.btn_buy_wrapper}>
      <BtnBuy/>
    </div>
  </div>
}


class Member extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      checkedIndex: 0,
    };
  }


  render() {
    const { userVipInfo,products } = this.props.store;
    const { loading } = this.props;
    if (userVipInfo == null) return (
      <ActivityIndicator
        color="white"
        toast
        animating={loading}
      />
    );
    return <div style={{ paddingBottom: '40px' }}>
      <div className={styles.header_bg}>
        <VIPHeader userVipInfo={userVipInfo}/>
      </div>
      <div className={styles.tips}>
        <div className={styles.tips_title}>会员专享特权</div>
        <div className={styles.tips_desc}>普通用户每周免费参与一期抽签抢金条，获赠1注抽签。购买会员店商品享受每期（周二、四、日22:00揭晓中签）参与0元抢金条。</div>
        <div className={styles.tips_desc}>购买喜腾精选毛巾每期赠送抽签抢黄金，每期1注；</div>
        <div className={styles.tips_desc}>购买喜腾订制水晶杯每期赠送抽签抢黄金，每期2注；</div>
        <div className={styles.tips_desc}>购买喜腾订制棒球帽每期赠送抽签抢黄金，每期5注；</div>
        <div className={styles.tips_desc}>购买雪豹茶庄茶饼每期赠送抽签抢黄金，每期10注；</div>
        <div className={styles.tips_desc}>购买一件女士钱包每期赠送抽签抢黄金，每期15注。</div>
      </div>
      <div className={styles.vip}>
        <div className={styles.vip_title}>会员专供</div>
        <div className={styles.vip_list}>
          {
            products.map((p,index)=>{
              return <ProductItem
                key={index+'#'}
                data={p}
                onClick={()=>{
                  this.props.dispatch({
                    type:'member/setActiveProduct',
                    payload:p
                  })
                  this.props.dispatch(routerRedux.push('/member/confirmOrder'))
                }}/>
            })
          }
        </div>
      </div>
      <Tips/>
    </div>;
  }
}

const Tips = () => {
  return (
    <div className={styles.answer}>
      <div className={styles.answer_title}>疑问小解答</div>
      <div className={styles.answer_content}>
        <div className={styles.answer_title_text}>喜币可以干什么？</div>
        <div>喜币可以抵用人民币，在平台购买0元抢商品哦!</div>
      </div>
    </div>
  );
};

export default connect(state => ({
  store: state.member,
  loading: state.loading.global,
}))(Member);

