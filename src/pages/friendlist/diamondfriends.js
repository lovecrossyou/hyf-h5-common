import React from 'react';
import { connect } from 'dva';
import styles from './page.css';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';

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
    const { userDiamondFriends,user } = this.props.store;
    return (
      <DocumentTitle title={user.nickName}>
        <div>
          <ActivityIndicator
            color="white"
            toast
            animating={this.props.loading}
          />
          <div className={styles.friend_list}>
            {
              userDiamondFriends.map((item, index) => {
                return (
                  <FriendItem friendInfo={item} key={index} action={this.navigateTo(item)}/>
                );
              })
            }
          </div>
          <EmptyPage empty={userDiamondFriends.length === 0}/>
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
