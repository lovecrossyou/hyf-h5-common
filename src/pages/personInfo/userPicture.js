import React from 'react';
import { connect } from 'dva';
import userStyles from './userStyle.css';
import { routerRedux } from 'dva/router';
import icon_left from '../../assets/astro/left.jpg';
import { ActivityIndicator } from 'antd-mobile';

function UserPicture(props) {
  const { isLoading } = props;
  const { userInfo } = props.personInfo;
  if (userInfo == null) {
    return <ActivityIndicator
      toast
      text="加载中"
      animating={isLoading}/>;
  } else {
    const { icon } = userInfo.userInfo;
    return (
      <div className={userStyles.user_picture_container}>
        <img src={userInfo.userInfo.icon} alt=""/>
      </div>
    );
  }
}

export default connect(state => {
  return {
    personInfo: state.personInfo,
    isLoading: state.loading.global
  };
})(UserPicture);
