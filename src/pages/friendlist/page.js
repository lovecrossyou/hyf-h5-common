import React from 'react';
import { connect } from 'dva';
import styles from './page.css';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';

import icon_haoyou_zuanshi from '../../assets/icon_haoyou_zuanshi@2x.png';
import icon_haoyou_huangjin from '../../assets/icon_haoyou_huangjin@2x.png';
import me_arrow from '../../assets/me_arrow@2x.png';
import {ActivityIndicator} from "../../components/ActivityIndicator";



const EmptyPage = ({ empty }) => {
  if (!empty) return null;
  return <div className={styles.emptyTips}>您还没有好友</div>;
};


class FriendList extends React.Component {
  navigateTo = (item) => {
    return () => {
      this.props.dispatch({
        type:'wallet/fetchDiamondFriends',
        payload:{
          user:item
        },
        cb:()=>{
          this.props.dispatch(routerRedux.push('/friendlist/diamondfriends'))
        }
      })
    };
  };

  render() {

    const { userProfitAllFriendInfo } = this.props.store;

    const userProfitDiamondFriendModelList = userProfitAllFriendInfo.userProfitDiamondFriendModelList;
    return (
      <DocumentTitle title='我的好友'>
        <div>
          <ActivityIndicator
            color="white"
            toast
            animating={this.props.loading}
          />
          <div className={styles.my_friend_header}>
            <div className={styles.friend_type}>
              <div className={styles.friend_title}>
                <img src={icon_haoyou_zuanshi} className={styles.diamond_friend_icon}/>
                <div>钻石好友</div>
              </div>
              <div className={styles.friend_count}>{userProfitAllFriendInfo.userProfitDiamondFriendAmount}人</div>
            </div>
            <div className={styles.friend_type}>
              <div className={styles.friend_title}>
                <img src={icon_haoyou_huangjin} className={styles.gold_friend_icon}/>
                <div>黄金好友</div>
              </div>
              <div className={styles.friend_count}>{userProfitAllFriendInfo.userProfitGoldenFriendAmount}人</div>
            </div>
          </div>
          <div className={styles.friend_list}>
            {
              userProfitAllFriendInfo.userProfitDiamondFriendModelList.map((item, index) => {
                return (
                  <FriendItem friendInfo={item} key={index} action={this.navigateTo(item)}/>
                );
              })
            }
          </div>
          <EmptyPage empty={userProfitDiamondFriendModelList.length === 0}/>
        </div>
      </DocumentTitle>
    );
  }

}

const FriendItem = ({ friendInfo, action }) => {

  return (
    <div onClick={action}>
      <div className={styles.diamond_friend_info}>
        <div className={styles.friend_info_left}>
          <img alt="touxiang" src={friendInfo.iconUrl} className={styles.friend_info_icon}/>
          <div className={styles.friend_nick_name}>{friendInfo.nickName}</div>
        </div>
        <div className={styles.friend_info_right}>
          <div>{friendInfo.diamondFriendAmount}人</div>
          <img alt="jiantou" src={me_arrow} className={styles.right_arrow}/>
        </div>
      </div>
    </div>
  );
};


export default connect(state => ({
  store: state.wallet,
  loading:state.loading.global
}))(FriendList);
