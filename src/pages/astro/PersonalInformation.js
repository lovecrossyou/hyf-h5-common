import React from 'react';
import { connect } from 'dva';
import styles from './page.css';
import { routerRedux } from 'dva/router';
import icon_left from '../../assets/astro/left.jpg';
import { Picker, List, ActivityIndicator } from 'antd-mobile';
import { createForm } from 'rc-form';
import DocumentTitle from 'react-document-title';
import { district, provinceLite } from 'antd-mobile-demo-data';

const Item = List.Item;
const Brief = Item.Brief;


const sex_values = [{
  label: '男',
  value: 1,
}, {
  label: '女',
  value: 2,
}];

function PersonalInformation(props) {
  const {selectedSex, userInfo } = props.astro;
  const { isLoading } = props;
  if (userInfo == null) {
    return <ActivityIndicator
      toast
      text="加载中"
      animating={isLoading}/>;
  } else {
    const { icon, cnName, xtNumber, sex, address, constellation } = userInfo.userInfo;
    console.log(userInfo.userInfo);
    return (
      <DocumentTitle title='用户信息'>
        <div>
          <div className={styles.head_portrait}>
            <span>头像</span>
            <span>
          <img className={styles.icon_name} src={icon} alt=""/>
          <img className={styles.icon_name_left} src={icon_left} alt=""/>
        </span>
          </div>
          <List className="my-list">
            <Item extra={cnName} arrow="horizontal" onClick={() => {
              props.dispatch(routerRedux.push('/astro/SetName'));
            }}
            >名字</Item>
            <Item extra={xtNumber}>喜腾号</Item>
            <Item arrow="horizontal" onClick={() => {
              props.dispatch(routerRedux.push('/astro/myInfo/QrCode'));
            }}>我的二维码</Item>
          </List>
          <div style={{ marginTop: '60px' }}></div>
          <Picker
            cols={1}
            data={sex_values}
            onChange={(sex) => {
              props.dispatch({
                type: 'astro/setSelectSex',
                payload: sex,
              });
            }}
            value={selectedSex}
            onOk={() => {
              return 'ok';
            }}
          >
            <List.Item arrow="horizontal">性别</List.Item>
          </Picker>
          <List className="my-list">
            <Item extra={constellation} arrow="horizontal" onClick={() => {
              props.dispatch(routerRedux.push('/astro/AstroItem'));
            }}>星座</Item>
            <div className='information_addr_btn'><Item extra={address} arrow="horizontal">收货地址</Item></div>
          </List>
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(state => {
  return {
    astro: state.astro,
    isLoading: state.loading.global,
  };
})(PersonalInformation);
