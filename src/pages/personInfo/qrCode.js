import React from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';

import styles from './page.css' ;

function QrCode(props) {
  const { qrData,userInfo } = props.personInfo;
  return <DocumentTitle title='我的二维码'>
    <div className={styles.qrcode}>
      <div className={styles.content}>
        <div className={styles.flex_r}>
          <img className={styles.avatar} src={userInfo.userInfo.icon} alt=''/>
          <div className={styles.info}>
            <div className={styles.name}>{userInfo.userInfo.cnName}</div>
            <div className={styles.xt_number}>喜腾号：{userInfo.userInfo.xtNumber}</div>
          </div>
        </div>
        <div className={styles.img_border}>
          <img className={styles.qr_img} src={qrData} alt=''></img>
        </div>
        <div className={styles.footer}>
          扫码成为我的钻石好友
        </div>
      </div>
    </div>
  </DocumentTitle>;
}

export default connect(state => {
  return {
    personInfo: state.personInfo,
  };
})(QrCode);
