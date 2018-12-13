import React from 'react';
import { connect } from 'dva';
import { Modal, Button, Radio } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import styles from './page.css';
import { ActivityIndicator } from '../../components/ActivityIndicator';

const VIPHeader = ()=>{
  return <div>

  </div>
}

const BtnBuy = ()=>{
  return <div className={styles.btn_buy}>
    立即购买
  </div>
}



const ProductItem = ({onClick})=>{
  return <div className={styles.product} onClick={onClick}>
    <div className={styles.p_img}></div>
    <div className={styles.p_info}>
      <div className={styles.p_info_title}>喜腾精选毛巾</div>
      <div className={styles.p_info_desc}>赠送抽签抢黄金，每期一注</div>
      <div className={styles.p_info_price}>￥28.9</div>
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
    const { userVipInfo } = this.props.store;
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
        <VIPHeader/>
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
          <ProductItem
            onClick={()=>{
              this.props.dispatch(routerRedux.push('/member/confirmOrder'))
            }}/>
          <ProductItem/>
          <ProductItem/>
        </div>
      </div>
      <Tips/>
    </div>;
  }

}

const VipItem = ({ vip, action }) => {
  return (
    <div className={[styles.vip_item]}>
      <div className={styles.vip_item_content}>
        <div className={styles.vip_left}>
          <img src={vip.img} alt="" className={styles.vip_left_img}/>
          <div className={styles.vip_left_text}>
            <div className={styles.vip_left_text_title}>{vip.title}</div>
            <div className={styles.vip_left_text_desc}>{vip.desc}</div>
            <div className={styles.vip_left_text_price}>{vip.price}元/年</div>
          </div>
        </div>
        <div className={styles.vip_right}>
          <div className={vip.enable !== false ? 'vip_right_action' : 'vip_right_action_disable'} onClick={action}
               vip_type={vip.type}>{vip.action}</div>
        </div>
      </div>
    </div>
  );
};



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

