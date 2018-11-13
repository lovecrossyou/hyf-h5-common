import React from 'react';
import { connect } from 'dva';
import styles from './page.css';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';



function ZeroPriceForDetails(props) {

  return <DocumentTitle title='中签详情'>
    <div>
      <div className={styles.price_details_container}>
        <div className={styles.price_details_head}>
          <div className={styles.price_details_tit}>0元抢金条第2018184期</div>
          <div className={styles.price_details_tit_intro}
               onClick={()=>{
                 props.dispatch(routerRedux.push('/awardDetail/page'))
               }}
          >奖品详情>></div>
          <div className={styles.price_details_num}>中签人数：3人<span>|</span>中签注数：3注</div>
        </div>
        <div className={styles.price_details_section}>
          <div className={styles.price_details_section_title}>一等奖（1注）</div>
          <div className={styles.price_details_section_item}>
          <span className={styles.price_details_section_item_headportrait}>
            {/*<img src="" alt=""/>*/}
          </span>
            <span className={styles.price_details_section_item_name}>贝贝</span>
            <span className={styles.price_details_section_item_num}>2注</span>
            <span>佳能750D单反套机 2件</span>
          </div>
          {/*<div className={styles.unfold}>展开v</div>*/}
        </div>

      </div>
    </div>
  </DocumentTitle>
}

export default connect(state=>{
  return {
    store:state
  }
})(ZeroPriceForDetails)
