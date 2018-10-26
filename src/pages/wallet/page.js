import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast,ActivityIndicator} from 'antd-mobile';

import my_wallet_rmb_icon from '../../assets/my_wallet_rmb_icon.png';
import my_wallet_xb_icon from '../../assets/my_wallet_xb_icon.png';
import me_icon_shuipiao_haoyou from '../../assets/me_icon_shuipiao_haoyou@2x.png';
import me_icon_shuipiao_hongbao from '../../assets/me_icon_shuipiao_hongbao@2x.png';
import me_icon_shuipiao_jiangli from '../../assets/me_icon_shuipiao_jiangli@2x.png';
import me_icon_ticket_blue from '../../assets/me_icon_ticket_blue@2x.png';
import me_icon_yinhangka from '../../assets/me_icon_yinhangka@2x.png';
import styles from './page.css';

const ContentPage = ({accountInfo,userProfitAllFriendInfo,userProfitInfo,dispatch})=>{

  // 我的好友
  function myFriend() {
    dispatch(routerRedux.push('/friendlist/page'));
  }

  // 邀请红包
  function inviteredPacket() {
    dispatch(routerRedux.push('/inviteredpacket/page'));
  }

  //喜币充值
  function xbCharge(){
    Toast.info('请下载app使用!', 1);
  }

  // 会员奖励
  function vipReward(){
    dispatch(routerRedux.push('/vipreward/page'));
  }

  // 点击运势
  function astroClick(){
    dispatch(routerRedux.push('/astro/page'));
  };


  // 会员中心
  function vipClick(){
    dispatch(routerRedux.push('/member/page'));
  };


  if (accountInfo == null) return null;
  return (
    <div>
      <div className={styles.wallet_header}>
        <div className={styles.wallet_item}>
          <div className='wallet_withdraw'>
            <img src={my_wallet_rmb_icon} className={styles.wallet_rmb_icon}/>
            <div className={styles.wallet_item_top_title}>人民币</div>
          </div>
          <div className={styles.wallet_money_count}>{accountInfo.rmbAmount / 100}</div>
        </div>
        <div className={styles.wallet_item}>
          <div className={styles.wallet_item_top}>
            <img src={my_wallet_xb_icon} className={styles.wallet_rmb_icon}/>
            <div className={styles.wallet_item_top_title}>喜币</div>
          </div>
          <div className={styles.wallet_money_count}>{accountInfo.xtbTotalAmount}</div>
        </div>
      </div>
      <div className={styles.wallet_fun}>
        <div className={styles.wallet_fun_item}>
          <div className={styles.wallet_item_top} onClick={myFriend}>
            <img src={me_icon_shuipiao_haoyou} className={styles.my_friend_item_img}/>
            <div>我的好友</div>
          </div>
          <div className={styles.wallet_fun_count_item}>{userProfitAllFriendInfo.userProfitAllFriendAmount}人</div>
        </div>
        <div className={styles.wallet_fun_item}>
          <div className={styles.wallet_item_top} onClick={inviteredPacket}>
            <img src={me_icon_shuipiao_hongbao} className={styles.my_invite_item_img}/>
            <div>邀请红包</div>
          </div>
          <div className={styles.wallet_fun_count_item}>{userProfitInfo.inviteProfitXtbAmount}喜币</div>
        </div>
        <div className={styles.wallet_fun_item}>
          <div className={styles.wallet_item_top} onClick={vipReward}>
            <img src={me_icon_shuipiao_jiangli} className={styles.my_sale_item_img}/>
            <div>会员奖励</div>
          </div>
          <div className={styles.wallet_fun_count_item}>{userProfitInfo.shareSellProfitRmbAmount/100}元</div>
        </div>

        <div className={styles.line}/>

        <div onClick={xbCharge} className={styles.wallet_fun_item}>
          <div className={styles.wallet_item_top}>
            <img src={me_icon_ticket_blue} className={styles.my_water_ticket_item_img}/>
            <div>喜币充值</div>
          </div>
          {/*<div className={styles.wallet_fun_count_item}>0元</div>*/}
        </div>
        <div className='wallet_bank'>
          <div className={styles.wallet_item_top}>
            <img src={me_icon_yinhangka} className={styles.my_bank_item_img}/>
            <div>银行卡</div>
          </div>
          <div className={styles.wallet_fun_count_item_big}>+</div>
        </div>

        <div onClick={vipClick} className={styles.wallet_fun_item}>
          <div className={styles.vip}>
            <img src={me_icon_ticket_blue} className={styles.my_water_ticket_item_img}/>
            <div>会员中心</div>
          </div>
        </div>

        <div onClick={astroClick} className={styles.wallet_fun_item}>
          <div className={styles.astro}>
            <img src={me_icon_ticket_blue} className={styles.my_water_ticket_item_img}/>
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
    </div>
  )
}


class Wallet extends React.Component {
  render() {
    const { accountInfo, userProfitAllFriendInfo, userProfitInfo } = this.props.store;
    const {loading} = this.props ;
    return <div>
      <ContentPage
        dispatch={this.props.dispatch}
        userProfitAllFriendInfo={userProfitAllFriendInfo}
        userProfitInfo={userProfitInfo}
        accountInfo={accountInfo}/>
      <ActivityIndicator
        color="white"
        toast
        animating={loading}
      />
    </div>;
  }
}

export default connect(state => ({
  store: state.wallet,
  loading: state.loading.global,
}))(Wallet);
