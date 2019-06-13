import React from 'react';
import { connect } from 'dva';
import styles from '../page.css';

import bg_icon_shuangyu from '../../../assets/astro/bg_icon_shuangyu@2x.png';
import BG1_icon_caiyun from '../../../assets/astro/BG1_icon_caiyun@2x.png';
import astroData from '../../../utils/astroData';

function Horoscope(props) {
  // console.log('星座详情页展示：',props.astro.userInfo.userInfo);
  const {cnName,constellation,sex} = props.astro.userInfo.userInfo;
  return (
    <div className={styles.Horoscopecontainer}>
      <div className={styles.Horoscopecontainer_tit}>
        <div className={styles.Horoscope_tit_left}>
          <div>
            <span className={styles.Horoscope_tit_left_name}>{cnName}</span>
            <span className={styles.Horoscope_tit_left_sex}>{sex==1?'男':'女'}</span>
          </div>
          <div className={styles.Horoscope_tit_left_center}>
            <span className={styles.Horoscope_tit_left_center_astro}>{astroData.astroName(constellation)}</span>
          </div>
          <div>天生的领导者，活跃.慷慨.乐观。</div>
        </div>
        <div className={styles.Horoscope_tit_right}>
          {/*<img src={} alt=""/>*/}
        </div>
      </div>
      <div className={styles.Horoscopecontainer_content}>
        <div className={styles.Horoscopecontainer_content_item}>
          <div className={styles.Horoscopecontainer_content_item_tit}>
            <img src={BG1_icon_caiyun} alt=""/>
            <span className={styles.Horoscopecontainer_content_item_tit_name}>财运</span>
          </div>
          <div>受木星支撑，财运大旺。</div>
        </div>

      </div>
    </div>
  );
}

export default connect(state => {
  return {
    astro:state.astro
  };
})(Horoscope);

