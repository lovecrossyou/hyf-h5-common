import React from 'react';
import { connect } from 'dva';
import styles from './page.css';
import me_icon_shuipiao_hongbao from '../../assets/me_icon_shuipiao_hongbao@2x.png';
import symbol_xiteng from '../../assets/symbol_xiteng_black3@2x.png';


const friends = [
  { img: symbol_xiteng, name: 'jyeee', presentXtbMount: 123, acceptTime: 1 },
  {
    img: symbol_xiteng,
    name: 'skskd',
    presentXtbMount: 122,
    acceptTime: 2,
  }, { img: symbol_xiteng, name: '221', presentXtbMount: 121, acceptTime: 3 }];


class InviteRedPacket extends React.Component {

  render() {
    const { inviteProfitXtb } = this.props.store;
    const { inviteProfitXtbRecordModelList } = inviteProfitXtb;
    console.log('inviteProfitXtb ', inviteProfitXtb);
    return (
      <div>
        <div className={styles.invite_red_pocket_header}>
          <div className={styles.invite_red_top}>
            <img src={me_icon_shuipiao_hongbao} className={styles.invite_red_pocket_icon}/>
            <div>钻石好友（{inviteProfitXtb.diamondUserAmount || 0}人）</div>
          </div>
          <div className={styles.invite_total_xb}>{inviteProfitXtb.inviteProfitXtbAmount || 0}喜币</div>
        </div>
        <div className={styles.friend_list}>
          {
            inviteProfitXtbRecordModelList.map((record, index) => {
              return (
                <FriendItem record={record} key={index}/>
              );
            })
          }
          <div className={styles.emptyTips}>您还没有钻石好友</div>
        </div>

      </div>

    );
  }
}

const FriendItem = ({ record }) => {
  return (
    <div className={styles.diamond_friend_item}>
      <div className={styles.diamond_friend_info}>
        <div className={styles.friend_info_left}>
          <img src={record.userIconUrl} className={styles.friend_info_icon}/>
          <div className={styles.profit_name_time}>
            <div className={styles.friend_nick_name}>{record.nickName}</div>
            <div className={styles.profit_time}>{record.acceptTime}</div>
          </div>
        </div>
      </div>
      <div className={styles.friend_info_right}>
        <div>+</div>
        <img src={symbol_xiteng} className={styles.xt_unit_icon}/>
        <div>{friend.presentXtbMount}</div>
      </div>
    </div>
  );
};


export default connect(state => ({
  store: state.wallet,
}))(InviteRedPacket);
