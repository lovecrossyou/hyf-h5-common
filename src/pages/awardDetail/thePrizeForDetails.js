import React from 'react';
import { connect } from 'dva';
import styles from './page.css'
function ThePriceForDetails(props) {
  return <div>
    <div className={styles.price_details_container}>
      <div className={styles.price_details_head}>
        <div className={styles.price_details_tit}>3D-0元抢购第2018184期</div>
        <div className={styles.price_details_num}>中签人数：3人<span>|</span>中签注数：3注</div>
      </div>
      <div className={styles.price_details_section}>
        <div className={styles.price_details_section_item}>
          <span className={styles.price_details_section_item_headportrait}>
            {/*<img src="" alt=""/>*/}
          </span>
          <span className={styles.price_details_section_item_name}>贝贝</span>
          <span className={styles.price_details_section_item_num}>2注</span>
          <span>佳能750D单反套机 2件</span>
        </div>

      </div>
    </div>
  </div>
}

export default connect(state=>{
  return {
    store:state
  }
})(ThePriceForDetails)
