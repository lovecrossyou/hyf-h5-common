import React from 'react';

import { connect } from 'dva';
import styles from './page.css';
import golden from '../../assets/golden.png'
import golden_titi from '../../assets/golden_titi.png'

function GoldenTicket(props) {
  const {qrData} = props.personInfo;
  return <div className={styles.golden_ticket_container}>
    <div className={styles.golden_ticket_title}>
      <img src={golden_titi} alt=""/>
    </div>
    <img className={styles.golden_ticket_main} src={golden} alt=""/>
    <div className={styles.xiteng_golden_ticket_intro}>
      <div className={styles.xiteng_golden_ticket_intro_left}>
        <img src={qrData} alt=""/>
      </div>
      <div className={styles.xiteng_golden_ticket_intro_right}>
        <div>黄金票：1张</div>
        <div>金额：0元</div>
        <div>揭晓日期：每周二、四、日22:00</div>
        <div className={styles.erweima}>扫面二维码，立即领取</div>
      </div>
    </div>
  </div>
}

export default connect(state => {
  return {
    personInfo:state.personInfo
  };
})(GoldenTicket);
