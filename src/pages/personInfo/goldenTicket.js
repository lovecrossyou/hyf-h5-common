import React from 'react';

import { connect } from 'dva';
import styles from './page.css';
import {my_gold_bar} from '../../assets/my_gold_bar.png'

function GoldenTicket(props) {
  return <div>
    <div className={styles.xiteng_golden_ticket_container}>
        <div className={styles.xiteng_golden_ticket}>
          <div className={styles.my_golden_bar}>
            <img src={my_gold_bar} alt=""/>
          </div>
          <div className={styles.my_gold_bar_info}>
            <span style={{color:"#cd243e",paddingRight:"10px"}}>100g金条</span>
            <span>中国黄金 完全免费 零风国黄金 完全免费 零风国黄金 完全免费 零风险</span>
          </div>
          <div className={styles.my_gold_bar_info_second}>同步福彩双色球,每周二,四,日揭晓中签,中了就送!</div>
          <div className={styles.my_gold_bar_info_third}>
            <span>0元抢金条</span>
            <span>￥<span className={styles.zero_bigger}>0</span>.00</span>
            <span>原价:29300.00元</span>
          </div>
        </div>
        <div className={styles.xiteng_golden_ticket_intro}>
          <div className={styles.xiteng_golden_ticket_intro_left}>
            {/*<img src="" alt=""/>*/}
          </div>
          <div className={styles.xiteng_golden_ticket_intro_right}>
            <div>黄金票：1张</div>
            <div>金额：0元</div>
            <div>揭晓日期：每周二、四、日22:00</div>
            <div className={styles.xiteng_golden_ticket_intro_righty}>扫描二维码，立即领取</div>
          </div>
        </div>
    </div>
  </div>
}

export default connect(state => {
  return {

  };
})(GoldenTicket);
