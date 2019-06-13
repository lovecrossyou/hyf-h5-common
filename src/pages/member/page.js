import React from 'react';
import { connect } from 'dva';
import { Modal, Button, ActivityIndicator, Radio } from 'antd-mobile';

import styles from './page.css';
// import diamondsImgIcon from '../../assets/icon_diamonds-vip@2x.png';
import godImgIcon from '../../assets/icon_goldvip@2x.png';
// import platinumImgIcon from '../../assets/icon_Platinum-vip@2x.png';

import vip_putong from '../../assets/vip/icon_huiyuan_putong@2x.png';
import vip_bojin from '../../assets/vip/icon_huiyuan_bojin@2x.png';
import vip_zuanshi from '../../assets/vip/icon_huiyuan_zuanshi@2x.png';
import vip_gold from '../../assets/vip/icon_huiyuan_huanjin@2x.png';
import { getAccessToken } from '../../utils/authority';
const RadioItem = Radio.RadioItem;


const vips = [
  { title: '黄金会员', img: godImgIcon, desc: '每期赠送1组抽签号码，奖励20喜币', price: '19.8', id: '1',type:'user_to_golden_vip' },
  // { title: '铂金会员', img: platinumImgIcon, desc: '每期赠送2组抽签号码，奖励30喜币', price: '29.8',type:'user_to_higher_golden_vip' },
  // { title: '钻石会员', img: diamondsImgIcon, desc: '每期赠送10组抽签号码，奖励100喜币', price: '99.8',type:'user_to_diamond_vip' },
];


const VIPHeader = ({vipInfo}) => {
  const {userIsVip,userVipType} = vipInfo ;
  if(userIsVip===false){
    return (
      <div className={styles.title}>
        <img width='150px' height='36px' src={vip_putong} alt=""/>
        <div className={styles.white_text}>您当前是
          <div className={styles.inline_text}>普通会员</div>
          ，仅可每月参与1次0元抢金砖活动
        </div>
      </div>
    );
  }

  if(userVipType==='higher_golden_user'){
    // 铂金会员
    return (
      <div className={styles.title}>
        <img width='150px' height='36px' src={vip_bojin} alt=""/>
        <div className={styles.white_text}>您当前是
          <div className={styles.inline_text}>铂金会员</div>
          ，每期赠送2组抽签号码 奖励20喜币
        </div>
      </div>
    );
  }
  if(userVipType==='golden_user'){
    // 黄金会员
    return (
      <div className={styles.title}>
        <img width='150px' height='36px' src={vip_gold} alt=""/>
        <div className={styles.white_text}>您当前是
          <div className={styles.inline_text}>黄金会员</div>
          ，每期赠送1组抽签号码 奖励30喜币
        </div>
      </div>
    );
  }

  if(userVipType==='diamond_user'){
    // 钻石会员
    return (
      <div className={styles.title}>
        <img width='150px' height='36px' src={vip_zuanshi} alt=""/>
        <div className={styles.white_text}>您当前是
          <div className={styles.inline_text}>钻石会员</div>
          ，每期赠送10组抽签号码 奖励100喜币
        </div>
      </div>
    );
  }


};

class Member extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  showModal = () => {
    this.setState({
      modal: true,
    });
  };

  onClose = () => {
    this.setState({
      modal: false,
    });
  };


  buyNow = (vip) => {
    return () => {
      console.log(vip.title);
      this.props.dispatch({
        type:'member/upgrade',
        payload:{
          vipProductType:'user_to_golden_vip'
        },
        cb:(orderInfo)=>{
          // console.log('xxxxx');
        }
      })

      // this.showModal();
      // post(vip.id).then((info)=>{
      //   pay(info)
      // })
    };
  };

  render() {

    const userVipInfo = {
      userIsVip:false
    }
    // const {userVipInfo  ,loading} = this.props.store ;
    // if(userVipInfo == null)return (
    //   <ActivityIndicator
    //     toast
    //     text="加载中"
    //     animating={loading}
    //   />
    // );
    // console.log(userVipInfo);
    return <div>
      <div className={styles.header_bg}>
        <VIPHeader vipInfo={userVipInfo}/>
      </div>
      <div className={styles.tips}>
        <div className={styles.tips_title}>会员专享特权</div>
        <div className={styles.tips_desc}>VIP会员一年内不限期数参与0元抢金砖活动，每期可参与选号抽签；每期均可发起拼团，每成功一个拼团奖励次选号抽签0元抢购金砖。</div>
      </div>
      <div className={styles.vip}>
        <div className={styles.vip_title}>会员等级特权</div>
        <div className={styles.vip_list}>
          {vips.map((vip, index) => {
            return (
              <VipItem key={index} vip={vip} action={this.buyNow(vip)}/>
            );
          })}
        </div>
      </div>
      <Tips/>

      <Modal
        visible={this.state.modal}
        transparent
        maskClosable={true}
        onClose={this.onClose}
        style={{ width: '90%' }}
      >
        <div>
          <div style={{ color: '#cc2636', fontSize: '18px' }}>我要升级</div>
          {vips.map((vip, index) => {
            return (
              <VipUpgradeItem key={index} vip={vip} action={this.buyNow(vip)}/>
            );
          })}
          <div style={{ marginTop: '10px' }}>
            <Button  type="warning" onClick={this.onClose}>确定</Button>
          </div>

          <div style={{ color: '#999999', fontSize: '12px', paddingTop: '4px' }}>会员升级仅需在当前的会员基础上补差价</div>
        </div>
      </Modal>

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
          <div className={styles.vip_right_action} onClick={action} vip_type={vip.type}>立即购买</div>
        </div>
      </div>
    </div>
  );
};

const VipUpgradeItem = ({ vip, action }) => {
  return (
    <div className={styles.vip_item_line} className='btnUpgrade'>
      <div className={styles.vip_item_content}>
        <div className={styles.vip_left}>
          <img src={vip.img} alt="" className={styles.vip_left_img}/>
          <div style={{ paddingLeft: '10px' }}>
            <div className={styles.vip_left_text_title}>{vip.title}</div>
            <div className={styles.vip_left_text_desc}>{vip.desc}</div>
          </div>
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
  loading:state.global.loading
}))(Member);
