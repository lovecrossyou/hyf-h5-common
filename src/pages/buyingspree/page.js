import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import styles from './page.css';
import {ActivityIndicator} from "../../components/ActivityIndicator";
import photo_shengdan from '../../assets/photo_shengdan@3x.jpg'
import xiteng from '../../assets/xiteng.jpg'

function BuyingSpree(props){
  return(
    <DocumentTitle title='喜腾抢购'>
      <div>
        <ActivityIndicator
          animating={props.loading}
        />
        <div className={styles.buying_spree_container}>
          <div className={styles.buying_spree_section}>
            <div className={styles.buying_spree_section_head}>
              <img src={xiteng} alt=""/>
            </div>
            <div className={styles.buying_spree_section_name}>喜腾</div>
            <div className={styles.buying_spree_section_content}>猪年大吉,金猪送福,抽签抢金条,100g,抽中即送,公开透明。每周二、四、日22:00揭晓中签,选中双色球就送,下载喜腾抢购APP即可免费参与,赶紧去下载吧!</div>
            <div className={styles.buying_spree_section_img}>
              <img src={photo_shengdan} alt=""/>
            </div>
          </div>
          <div className={styles.buying_spree_section_down_container}>
            <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.xiteng.buy" className={styles.buying_spree_section_down}>
              立即下载
            </a>
          </div>
        </div>
      </div>
    </DocumentTitle>
  )
}
export default connect(state => ({

}))(BuyingSpree);
