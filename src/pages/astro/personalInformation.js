import React from 'react';

import { connect } from 'dva';
import styles from './page.css';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { List } from 'antd-mobile';
import icon_woman_h from "../../assets/astro/icon_woman_h@2x.png";

const Item = List.Item;
const Brief = Item.Brief;

function PersonalInformation(props) {
  console.log(props);
  const hh = 'y420m7';
  return (
    <div>
      <List renderHeader={() => '个人信息'} className="my-list">
        <Item extra={hh} arrow="horizontal">头像</Item>
        <Item extra={hh} arrow="horizontal">名字</Item>
        <Item extra={hh} arrow="horizontal">喜腾号</Item>
        <Item extra={hh} arrow="horizontal">我的二维码</Item>
      </List>
      <List renderHeader={() => ''} className="my-list">
        <Item extra={hh} arrow="horizontal">性别</Item>
        <Item extra={hh} arrow="horizontal" onClick={()=>{
          props.dispatch(routerRedux.push('/astro/AstroItem'))
        }}>星座</Item>
        <Item extra={hh} arrow="horizontal">送货地址</Item>
      </List>
    </div>
  )
}

export default connect(state => {
  return {

  };
})(PersonalInformation);
