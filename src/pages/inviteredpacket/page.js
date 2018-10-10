import React from 'react';
import {connect} from 'dva';
import styles from './page.css';
import me_icon_shuipiao_hongbao from '../../assets/me_icon_shuipiao_hongbao@2x.png';
import symbol_xiteng from '../../assets/symbol_xiteng_black3@2x.png';


const friends = [{img:symbol_xiteng,name:"jyeee",presentXtbMount:123,acceptTime:1},{img:symbol_xiteng,name:"skskd",presentXtbMount:122,acceptTime:2},{img:symbol_xiteng,name:"221",presentXtbMount:121,acceptTime:3}];


class InviteRedPacket extends React.Component {

  render() {
    return(
      <div>
        <div className={styles.invite_red_pocket_header}>
          <div className={styles.invite_red_top}>
            <img src={me_icon_shuipiao_hongbao} className={styles.invite_red_pocket_icon}/>
            <div>钻石好友（123人）</div>
          </div>
          <div className={styles.invite_total_xb}>123喜币</div>
        </div>
        <div className={styles.friend_list}>

          {
            friends.map((item,index)=>{
              return (
                <FriendItem friend={item} key={index}/>
              )
            })
          }
        </div>

      </div>

    )
  }

}

const FriendItem = ({friend})=>{
  return (
    <div className={styles.diamond_friend_item}>
      <div className={styles.diamond_friend_info}>
        <div className={styles.friend_info_left}>
          <img src={friend.img} className={styles.friend_info_icon} />
          <div className={styles.profit_name_time}>
            <div className={styles.friend_nick_name}>{friend.name}</div>
            <div className={styles.profit_time}>{friend.acceptTime}</div>
          </div>
        </div>
      </div>
      <div className={styles.friend_info_right}>
        <div>+</div>
        <img src={symbol_xiteng} className={styles.xt_unit_icon}/>
        <div>{friend.presentXtbMount}</div>
      </div>
    </div>
  )
};
export default connect(({shoppingcart}) => ({
  store: shoppingcart
}))(InviteRedPacket);
