import React from 'react';
import {connect} from 'dva';
import styles from '../page.css';

function Horoscope(props) {
  return (
    <div className={styles.Horoscope}>
      <div className={styles.x}>
        <div className={styles.Horoscope_tit_left}>
          <div>
            <span className={styles.Horoscope_tit_left_name}>车银优</span>
            <span className={styles.Horoscope_tit_left_sex}>男</span>
          </div>
          <div className={styles.Horoscope_tit_left_center}>
            <span>狮子座</span>
            <span>阳历1997年3月30日</span>
          </div>
          <div>天生的领导者，活跃.慷慨.乐观。</div>
        </div>
        <div className={styles.Horoscope_tit_right}>
          {/*<img src={} alt=""/>*/}
        </div>
      </div>
    </div>
  );
}

export default connect(state => {
  return {
    pageData: state.main
  };
})(Horoscope);

