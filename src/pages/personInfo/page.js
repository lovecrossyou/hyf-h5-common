import React from 'react';
import { connect } from 'dva';
import styles from './page.css';
import { routerRedux } from 'dva/router';
import icon_left from '../../assets/astro/left.jpg';
import { Picker, List, ActivityIndicator } from 'antd-mobile';
import DocumentTitle from 'react-document-title';


const Item = List.Item;
const Brief = Item.Brief;

function PersonalInformation(props) {
  const { selectSex, selectedSex, userInfo } = props.personInfo;
  const { isLoading } = props;
  if (userInfo == null) {
    console.log(1111);
    return <ActivityIndicator
      toast
      text="加载中"
      animating={isLoading}/>;
  } else {
    console.log(222);
    const { icon, cnName, xtNumber, sex, address, constellation } = userInfo.userInfo;
    console.log(userInfo.userInfo);
    return (
      <DocumentTitle title='用户资料'>
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
              props.dispatch(routerRedux.push('/personInfo/qrCode'));
            }}>我的二维码</Item>
          </List>
          <div style={{ marginTop: '60px' }}></div>
          <Picker
            cols={1}
            data={selectSex}
            value={selectedSex}
            extra={sex == 1 ? '男' : '女'}
            onChange={(sex) => {
              props.dispatch({
                type: 'astro/setSelectSex',
                payload: sex,
              });
            }}
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
            <Item extra={address} arrow="horizontal">送货地址</Item>
          </List>
        </div>
      </DocumentTitle>

    );
  }
}

export default connect(state => {
  return {
    personInfo: state.personInfo,
    isLoading: state.loading.global,
  };
})(PersonalInformation);
