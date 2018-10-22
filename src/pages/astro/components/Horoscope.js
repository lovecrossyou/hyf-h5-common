import React from 'react';
import styles from '../page.css';

import bg_icon_shuangyu from '../../../assets/astro/bg_icon_shuangyu@2x.png';
import BG1_icon_caiyun from '../../../assets/astro/BG1_icon_caiyun@2x.png';

function Horoscope({data}) {
  return (
    <div className={styles.Horoscopecontainer}>
      <div className={styles.Horoscopecontainer_tit}>
        <div className={styles.Horoscope_tit_left}>
          <div>
            <span className={styles.Horoscope_tit_left_name}>车银优</span>
            <span className={styles.Horoscope_tit_left_sex}>男</span>
          </div>
          <div className={styles.Horoscope_tit_left_center}>
            <span className={styles.Horoscope_tit_left_center_astro}>狮子座</span>
            <span>阳历1997年3月30日</span>
          </div>
          <div>天生的领导者，活跃.慷慨.乐观。</div>
        </div>
        <div className={styles.Horoscope_tit_right}>
          <img src={bg_icon_shuangyu} alt=""/>
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

export default Horoscope;

