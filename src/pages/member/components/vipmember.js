import React from 'react';
import { connect } from 'dva';
import { Modal, Button, Radio } from 'antd-mobile';

import styles from './page.css';
import diamondsImgIcon from '../../../assets/icon_diamonds_vip.png';
import godImgIcon from '../../../assets/icon_goldvip@2x.png';
import platinumImgIcon from '../../../assets/icon_Platinum_vip@2x.png';

import vip_putong from '../../../assets/vip/icon_huiyuan_putong@2x.png';
import vip_bojin from '../../../assets/vip/icon_huiyuan_bojin@2x.png';
import vip_zuanshi from '../../../assets/vip/icon_huiyuan_zuanshi@2x.png';
import vip_gold from '../../../assets/vip/icon_huiyuan_huanjin@2x.png';


import checked_icon from '../../../assets/vip/icon_huiyuan_shengji_xuanzhong@2x.png' ;
import unchecked_icon from '../../../assets/vip/icon_huiyuan_shengji@2x.png' ;
import { ActivityIndicator } from '../../../components/ActivityIndicator';
const RadioItem = Radio.RadioItem;


const VipNormal = [
  {
    title: '黄金会员',
    img: godImgIcon,
    desc: '赠送抽签抢汽车一年，每期1注',
    price: '19.8',
    id: '1',
    type: 'user_to_golden_vip',
    action: '立即购买',
  },
  {
    title: '铂金会员',
    img: platinumImgIcon,
    desc: '赠送抽签抢汽车一年，每期2注',
    price: '29.8',
    type: 'user_to_higher_golden_vip',
    action: '立即购买',
  },
  {
    title: '钻石会员',
    img: diamondsImgIcon,
    desc: '赠送抽签抢汽车一年，每期10注',
    price: '99.8',
    type: 'user_to_diamond_vip',
    action: '立即购买',
  },
];

// 黄金会员
const GoldenVip = [
  {
    title: '黄金会员',
    img: godImgIcon,
    desc: '赠送抽签抢汽车一年，每期1注',
    price: '19.8',
    id: '1',
    type: 'user_to_golden_vip',
    action: '立即购买',
  },
  {
    title: '铂金会员',
    img: platinumImgIcon,
    desc: '赠送抽签抢汽车一年，每期2注',
    price: '29.8',
    type: 'golden_to_higher_golden_vip',
    action: '立即升级',
  },
  {
    title: '钻石会员',
    img: diamondsImgIcon,
    desc: '赠送抽签抢汽车一年，每期10注',
    price: '99.8',
    type: 'golden_to_diamond_vip',
    action: '立即升级',
  },
];

//铂金会员
const PlatinumVip = [
  {
    title: '黄金会员',
    img: godImgIcon,
    desc: '赠送抽签抢汽车一年，每期1注',
    price: '19.8',
    id: '1',
    type: 'user_to_golden_vip',
    enable: false,
    action: '立即升级',
  },
  {
    title: '铂金会员',
    img: platinumImgIcon,
    desc: '赠送抽签抢汽车一年，每期2注',
    price: '29.8',
    type: 'user_to_higher_golden_vip',
    action: '立即购买',
  },
  {
    title: '钻石会员',
    img: diamondsImgIcon,
    desc: '赠送抽签抢汽车一年，每期2注',
    price: '99.8',
    type: 'higher_golden_to_diamond_vip',
    action: '立即升级',
  },
];

//钻石会员
const DiamondVip = [
  {
    title: '黄金会员',
    img: godImgIcon,
    desc: '赠送抽签抢汽车一年，每期1注',
    price: '19.8',
    id: '1',
    type: 'user_to_golden_vip',
    enable: false,
    action: '立即购买',
  },
  {
    title: '铂金会员',
    img: platinumImgIcon,
    desc: '赠送抽签抢汽车一年，每期2注',
    price: '29.8',
    type: 'golden_to_higher_golden_vip',
    enable: false,
    action: '立即购买',
  },
  {
    title: '钻石会员',
    img: diamondsImgIcon,
    desc: '赠送抽签抢汽车一年，每期10注',
    price: '99.8',
    type: 'user_to_diamond_vip',
    action: '立即购买',
  },
];


const UpgradeVip = VipNormal.slice(1, 3);

const createVipModels = (vipInfo) => {
  const { userIsVip, userVipType } = vipInfo;
  if (userIsVip == false) return VipNormal;
  else if (userVipType === 'golden_user') return GoldenVip;
  else if (userVipType === 'higher_golden_user') return PlatinumVip;
  else if (userVipType === 'diamond_user') return DiamondVip;
};


const VIPHeader = ({ vipInfo,upgradeClick }) => {
  const { userIsVip, userVipType, vipEndTime } = vipInfo;
  if (userIsVip === false) {
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

  if (userVipType === 'higher_golden_user') {
    // 铂金会员
    return (
      <div className={styles.title}>
        <img width='150px' height='36px' src={vip_bojin} alt=""/>
        <div className={styles.white_text}>您当前是
          <div className={styles.inline_text}>铂金会员</div>
          ，每期赠送2组抽签号码 奖励20喜币
        </div>
        <div className={styles.vipEndTime}>{vipEndTime}</div>
        <div onClick={upgradeClick} className={styles.btn_upgrade}>立即升级</div>

      </div>
    );
  }
  if (userVipType === 'golden_user') {
    // 黄金会员
    return (
      <div className={styles.title}>
        <img width='150px' height='36px' src={vip_gold} alt=""/>
        <div className={styles.white_text}>您当前是
          <div className={styles.inline_text}>黄金会员</div>
          ，每期赠送1组抽签号码 奖励20喜币
        </div>
        <div className={styles.vipEndTime}>{vipEndTime}</div>
        <div onClick={upgradeClick} className={styles.btn_upgrade}>立即升级</div>

      </div>
    );
  }

  if (userVipType === 'diamond_user') {
    // 钻石会员
    return (
      <div className={styles.title}>
        <img width='150px' height='36px' src={vip_zuanshi} alt=""/>
        <div className={styles.white_text}>您当前是
          <div className={styles.inline_text}>钻石会员</div>
          ，每期赠送10组抽签号码 奖励100喜币
        </div>
        <div onClick={upgradeClick} className={styles.btn_upgrade}>立即升级</div>

      </div>
    );
  }
};

class VIPMember extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      checkedIndex: 0,
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

  onChange = (index) => {
    this.setState({
      checkedIndex: index,
    });
  };


  VIPChange = (vip, index) => {
    this.setState({
      checkedIndex: index,
    });
    //保存升级的VIP类型
    this.props.dispatch({
      type: 'member/saveVip',
      payload: vip,
    });
  };

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
    const currentVips = createVipModels(userVipInfo);
    return <div style={{ paddingBottom: '40px' }}>
      <div className={styles.vip}>
        <div className={styles.vip_title}>会员等级特权</div>
        <div className={styles.vip_list}>
          {currentVips.map((vip, index) => {
            return (
              <VipItem key={index} vip={vip}/>
            );
          })}
        </div>
      </div>
      <Modal
        visible={this.state.modal}
        transparent
        maskClosable={true}
        onClose={this.onClose}
        style={{ width: '90%' }}
      >
        <div>
          <div style={{ color: '#cc2636', fontSize: '36px' }}>我要升级</div>
          {UpgradeVip.map((vip, index) => {
            return (
              <VipUpgradeItem
                onChange={() => {
                  this.VIPChange(vip, index);
                }}
                vip={vip}
                key={index + '#'}
                selected={this.state.checkedIndex === index}/>
            );
          })}
          <div style={{ marginTop: '10px' }} className='btn_vip_upgrade'>
            <Button type="warning" onClick={this.onClose}>确定</Button>
          </div>

          <div style={{ color: '#999999', fontSize: '24px', paddingTop: '8px' }}>会员升级仅需在当前的会员基础上补差价</div>
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
          <div className={vip.enable !== false ? 'vip_right_action' : 'vip_right_action_disable'} onClick={action}
               vip_type={vip.type}>{vip.action}</div>
        </div>
      </div>
    </div>
  );
};

const VipUpgradeItem = ({ vip, action, selected = false, onChange }) => {
  return (
    <div className={styles.vip_item_line} onClick={onChange}>
      <div className={styles.flex_r}>
        <div className={styles.vip_item_content}>
          <div className={styles.vip_left}>
            <img src={vip.img} alt="" className={styles.vip_left_img}/>
            <div style={{ paddingLeft: '10px' }}>
              <div className={styles.vip_left_text_title}>{vip.title}</div>
              <div className={styles.vip_left_text_desc}>{vip.desc}</div>
            </div>
          </div>
        </div>
        {
          selected ? (<img src={checked_icon}/>) : <img src={unchecked_icon}/>
        }
      </div>
    </div>
  );
};



export default connect(state => ({
  store: state.member,
  loading: state.loading.global,
}))(VIPMember);
