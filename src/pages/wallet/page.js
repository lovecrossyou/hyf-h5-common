import React from 'react';
import {connect} from 'dva';
import styles from './page.css'

import my_wallet_rmb_icon from '../../assets/my_wallet_rmb_icon.png'
import my_wallet_xb_icon from '../../assets/my_wallet_xb_icon.png'
import me_icon_shuipiao_haoyou from '../../assets/me_icon_shuipiao_haoyou@2x.png'
import me_icon_shuipiao_hongbao from '../../assets/me_icon_shuipiao_hongbao@2x.png'
import me_icon_shuipiao_jiangli from '../../assets/me_icon_shuipiao_jiangli@2x.png';
import me_icon_ticket_blue from '../../assets/me_icon_ticket_blue@2x.png';
import me_icon_yinhangka from '../../assets/me_icon_yinhangka@2x.png';
import {routerRedux} from 'dva/router';


class Wallet extends React.Component {
  // 我的好友
  myFriend(){
    this.props.dispatch(routerRedux.push('/friendlist/page'))
  }

  // 邀请红包
  inviteredPacket(){
    this.props.dispatch(routerRedux.push('/inviteredpacket/page'))
  }


  render() {
    const {accountInfo,userProfitAllFriendInfo,userProfitInfo} = this.props.store ;
    if(accountInfo==null)return null ;
    return <div>
      <div className={styles.wallet_header}>
        <div className={styles.wallet_item}>
          <div className={styles.wallet_item_top_rmb}>
            <img src={my_wallet_rmb_icon} className={styles.wallet_rmb_icon} />
            <div className={styles.wallet_item_top_title}>人民币</div>
          </div>
          <div className={styles.wallet_money_count}>{accountInfo.rmbAmount/100}</div>
        </div>
        <div className={styles.wallet_item}>
          <div className={styles.wallet_item_top}>
            <img src={my_wallet_xb_icon} className={styles.wallet_rmb_icon} />
            <div className={styles.wallet_item_top_title}>喜币</div>
          </div>
          <div className={styles.wallet_money_count}>{accountInfo.xtbTotalAmount/100}</div>
        </div>
      </div>
      <div className={styles.wallet_fun}>
        <div className={styles.wallet_fun_item}>
          <div className={styles.wallet_item_top} onClick={this.myFriend.bind(this)}>
            <img src={me_icon_shuipiao_haoyou} className={styles.my_friend_item_img} />
            <div>我的好友</div>
          </div>
          <div className={styles.wallet_fun_count_item}>{userProfitAllFriendInfo.userProfitAllFriendAmount}人</div>
        </div>
        <div className={styles.wallet_fun_item}>
          <div className={styles.wallet_item_top} onClick={this.inviteredPacket.bind(this)}>
            <img src={me_icon_shuipiao_hongbao} className={styles.my_invite_item_img} />
            <div>邀请红包</div>
          </div>
          <div className={styles.wallet_fun_count_item}>-喜币</div>
        </div>
        <div  className={styles.wallet_fun_item}>
          <div className={styles.wallet_item_top}>
            <img src={me_icon_shuipiao_jiangli} className={styles.my_sale_item_img} />
            <div>会员奖励</div>
          </div>
          <div className={styles.wallet_fun_count_item}>-元</div>
        </div>
        <div  className={styles.wallet_fun_item}>
          <div className={styles.wallet_item_top}>
            <img src={me_icon_ticket_blue} className={styles.my_water_ticket_item_img} />
            <div>喜币充值</div>
          </div>
          <div className={styles.wallet_fun_count_item}>-张</div>
        </div>
        <div className={styles.bank}>
          <div className={styles.wallet_item_top}>
            <img src={me_icon_yinhangka} className={styles.my_bank_item_img} />
            <div>银行卡</div>
          </div>
          <div className={styles.wallet_fun_count_item_big}>+</div>
        </div>

        <div  className={styles.wallet_fun_item}>
          <div className={styles.account_detail}>
            <img src={me_icon_ticket_blue} className={styles.my_water_ticket_item_img} />
            <div>账单明细</div>
          </div>
        </div>

        <div  className={styles.wallet_fun_item}>
          <div className={styles.security}>
            <img src={me_icon_ticket_blue} className={styles.my_water_ticket_item_img} />
            <div>账户安全</div>
          </div>
        </div>
      </div>
    </div>
  }

}

export default connect(state => ({
  store: state.wallet
}))(Wallet);
