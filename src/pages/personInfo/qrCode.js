import React from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';

import styles from './page.css' ;

function QrCode(props) {
  const { qrData } = props.personInfo;

  console.log('qrData ', qrData);
  return <DocumentTitle title='我的二维码'>
    <div className={styles.qrcode}>
      <div className={styles.content}>
        <div className={styles.flex_r}>
          <div className={styles.avatar}></div>
          <div className={styles.info}>
            <div className={styles.name}>猪猪侠9527</div>
            <div className={styles.xt_number}>喜腾号：100008</div>
          </div>
        </div>
        <div className={styles.img_border}>
          <img className={styles.qr_img} src={qrData} alt=''></img>
        </div>
        <div className={styles.footer}>
          扫一扫上面二维码图案
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
