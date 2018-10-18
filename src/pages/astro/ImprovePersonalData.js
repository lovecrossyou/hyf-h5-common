import React from 'react';
import {connect} from 'dva';
import styles from './page.css';

import icon_man from "../../assets/astro/icon_man@2x.png";
import icon_woman from "../../assets/astro/icon_woman@2x.png";


function ImprovePersonalData(props) {
  return (
    <div>
      <div className={styles.improve_data}>
          <div className={styles.improve_data_tit}>请完善个人资料</div>
          <div className={styles.improve_data_content}>
              <span>
                <img src={icon_man} alt=""/>
                <span>我是男生</span>
              </span>
                <span>
                <img src={icon_woman} alt=""/>
                <span>我是女生</span>
              </span>
          </div>
      </div>
      <div className={styles.improve_data}>
        <div className={styles.improve_data_tit}>我的星座</div>
        <div className={styles.improve_data_content}>白羊座啊啊啊啊啊 </div>
      </div>

      <div>完成</div>
    </div>
  );
}

export default connect(state => {
  return {
    pageData: state.main
  };
})(ImprovePersonalData);

