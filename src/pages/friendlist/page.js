import React from 'react';
import {connect} from 'dva';
import styles from './page.css';
import icon_haoyou_zuanshi from '../../assets/icon_haoyou_zuanshi@2x.png';
import icon_haoyou_huangjin from '../../assets/icon_haoyou_huangjin@2x.png';
import me_arrow from '../../assets/me-arrow@2x.png';

const friends = [{img:icon_haoyou_huangjin,name:"jyeee",count:123,diamondFriendAmount:1},{img:icon_haoyou_huangjin,name:"skskd",count:122,diamondFriendAmount:2},{img:icon_haoyou_huangjin,name:"221",count:121,diamondFriendAmount:3}];



class FriendList extends React.Component {
  navigateTo=(item)=>{
    return()=>{
      console.log(item.name);
    }
  };
  render() {
    return(
      <div>
        <div className={styles.my_friend_header}>
          <div className={styles.friend_type} >
            <div className={styles.friend_title}>
              <img src={icon_haoyou_zuanshi} className={styles.diamond_friend_icon} />
              <div>钻石好友</div>
            </div>
            <div className={styles.friend_count}>123人</div>
          </div>
          <div className={styles.friend_type}>
            <div className={styles.friend_title}>
              <img src={icon_haoyou_huangjin} className={styles.gold_friend_icon} />
              <div>黄金好友</div>
            </div>
            <div className={styles.friend_count}>321人</div>
          </div>
        </div>
        <div className={styles.friend_list}>
          {
            friends.map((item,index)=>{
              return (
                <FriendItem friendInfo={item} key={index} action={this.navigateTo(item)}/>
              )
            })
          }
        </div>

      </div>
    )
  }

}

const FriendItem = ({friendInfo,action})=>{
  return (
    <div onClick={action}>
      <div className={styles.diamond_friend_info}>
        <div className={styles.friend_info_left}>
          <img alt="touxiang" src={friendInfo.img} className={styles.friend_info_icon} />
          <div className={styles.friend_nick_name}>{friendInfo.name}</div>
        </div>
        <div className={styles.friend_info_right}>
          <div>{friendInfo.diamondFriendAmount}人</div>
          <img alt="jiantou" src={me_arrow} className={styles.right_arrow} />
        </div>
      </div>
    </div>
  )
};


export default connect(({shoppingcart}) => ({
  store: shoppingcart
}))(FriendList);

