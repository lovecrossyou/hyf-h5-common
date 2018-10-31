import React from 'react';

import { connect } from 'dva';
import styles from './page.css';
import { routerRedux } from 'dva/router';

function RushTopurchase(props) {
  const {userInfo} = props.personInfo;
  if(userInfo==null){
    return null;
  }else{
    const {cnName,icon} = userInfo.userInfo;
    console.log('11111111111',userInfo)
    return <div className={styles.rush_topurchase_container}>
      <div className={styles.rush_topurchase_userinfo}>
        <img className={styles.rush_topurchase_userinfo_touxiang} src={icon} alt=""/>
        <span className={styles.rush_topurchase_userinfo_name}>{cnName}</span>
      </div>
      <div className={styles.rush_topurchase_gold}>亲，我送你一张喜腾黄金票！</div>
      <div className={styles.rush_topurchase_gold_info}>凭票0元抢金条、同步福彩双色球，选中6个红色球1个蓝色球即可免费领取金条，完全免费，公开透明，选中即送每周二、四、日22:00揭晓中签</div>
      <div className={styles.rush_topurchase_gold_info_pic}>
        {/*<img src={my_gold_bar} alt=""/>*/}
      </div>
      <div className={styles.rush_topurchase_gold_btn}>
        <button>立即领取</button>
      </div>
    </div>
  }
}

export default connect(state => {
  return {
    personInfo:state.personInfo
  };
})(RushTopurchase);
