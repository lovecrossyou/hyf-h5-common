import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast} from 'antd-mobile';

import assets_icon_rmbaccount from '../../assets/assets_icon_rmbaccount@2x.png';
import assets_icon_xibiaccount from '../../assets/assets_icon_xibiaccount@2x.png';
import me_icon_shuipiao_haoyou from '../../assets/me_icon_shuipiao_haoyou@2x.png';
import me_icon_shuipiao_hongbao from '../../assets/me_icon_shuipiao_hongbao@2x.png';
import me_icon_shuipiao_jiangli from '../../assets/me_icon_shuipiao_jiangli@2x.png';
import me_icon_ticket_blue from '../../assets/me_icon_ticket_blue@2x.png';
import me_icon_yinhangka from '../../assets/me_icon_yinhangka@2x.png';
import icon_rmb from '../../assets/icon_rmb@2x.png';
import assets_icon_vip from '../../assets/assets_icon_vip@2x.png';
import assets_icon_horoscope from '../../assets/assets_icon_horoscope@2x.png'
import styles from './page.css';


class Wallet extends React.Component {
  // 我的好友
  myFriend() {
    this.props.dispatch(routerRedux.push('/friendlist/page'));
  }

  // 邀请红包
  inviteredPacket() {
    this.props.dispatch(routerRedux.push('/inviteredpacket/page'));
  }

  //喜币充值
  xbCharge(){
    Toast.info('请下载app使用!', 1);
  }

  // 会员奖励
  vipReward(){
    this.props.dispatch(routerRedux.push('/vipreward/page'));
  }


  render() {
    const { accountInfo, userProfitAllFriendInfo, userProfitInfo } = this.props.store;
    if (accountInfo == null) return null;
    return <div>
      <div className={styles.wallet_header}>
        <div className={styles.wallet_item}>
          <div className={styles.wallet_item_top}>
            <img src={assets_icon_rmbaccount} className={styles.wallet_rmb_icon}/>
            <div className={styles.wallet_item_top_title}>人民币</div>
          </div>
          <div className={styles.wallet_money_count}>{accountInfo.rmbAmount / 100}</div>
        </div>
        <div className={styles.cutting_line}></div>
        <div className={styles.wallet_item}>
          <div className={styles.wallet_item_top}>
            <img src={assets_icon_xibiaccount} className={styles.wallet_rmb_icon}/>
            <div className={styles.wallet_item_top_title}>喜币</div>
          </div>
          <div className={styles.wallet_money_count}>{accountInfo.xtbTotalAmount}</div>
        </div>
      </div>
      <div className={styles.wallet_fun}>
        <div className={styles.wallet_fun_item}>
          <div className={styles.wallet_item_top} onClick={this.myFriend.bind(this)}>
            <img src={me_icon_shuipiao_haoyou} className={styles.my_friend_item_img}/>
            <div>我的好友</div>
          </div>
          <div className={styles.wallet_fun_count_item}>{userProfitAllFriendInfo.userProfitAllFriendAmount}人</div>
        </div>
        <div className={styles.wallet_fun_item}>
          <div className={styles.wallet_item_top} onClick={this.inviteredPacket.bind(this)}>
            <img src={me_icon_shuipiao_hongbao} className={styles.my_invite_item_img}/>
            <div>邀请红包</div>
          </div>
          <div className={styles.wallet_fun_count_item}>{userProfitInfo.inviteProfitXtbAmount}喜币</div>
        </div>
        <div className={styles.wallet_fun_item}>
          <div className={styles.wallet_item_top} onClick={this.vipReward.bind(this)}>
            <img src={me_icon_shuipiao_jiangli} className={styles.my_sale_item_img}/>
            <div>会员奖励</div>
          </div>
          <div className={styles.wallet_fun_count_item}>{userProfitInfo.shareSellProfitRmbAmount/100}元</div>
        </div>

        <div className={styles.line}/>

        <div onClick={this.xbCharge} className={styles.wallet_fun_item}>
          <div className={styles.wallet_item_top}>
            <img src={icon_rmb} className={styles.my_water_ticket_item_img}/>
            <div>喜币充值</div>
          </div>
          {/*<div className={styles.wallet_fun_count_item}>0元</div>*/}
        </div>
        <div className='wallet_bank'>
          <div className={styles.back_card}>
            <img src={me_icon_yinhangka} className={styles.my_bank_item_img}/>
            <div>银行卡</div>
          </div>
          <div className={styles.back_card_add}>+</div>
        </div>

        <div onClick={this.vipClick} className={styles.wallet_fun_item}>
          <div className={styles.vip}>
            <img src={assets_icon_vip} className={styles.my_water_ticket_item_img}/>
            <div>会员中心</div>
          </div>
        </div>

        <div onClick={this.astroClick} className={styles.wallet_fun_item}>
          <div className={styles.astro}>
            <img src={assets_icon_horoscope} className={styles.my_water_ticket_item_img}/>
            <div>星座运势</div>
          </div>
        </div>
        <div className={styles.wallet_fun_item}>
          <div className='account_record'>
            <img src={me_icon_ticket_blue} className={styles.my_water_ticket_item_img}/>
            <div>账单明细</div>
          </div>
        </div>
      </div>
    </div>;
  }


  // 点击运势
  astroClick = () => {
    this.props.dispatch(routerRedux.push('/astro/page'));
  };


  // 会员中心
  vipClick = () => {
    this.props.dispatch(routerRedux.push('/member/page'));
  };

}

export default connect(state => ({
  store: state.wallet,
}))(Wallet);
