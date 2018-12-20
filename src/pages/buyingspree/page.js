import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import styles from './page.css';
import {ActivityIndicator} from "../../components/ActivityIndicator";
import { routerRedux } from 'dva/router';
import photo_shengdan from '../../assets/photo_shengdan@3x.png'
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
            <div className={styles.buying_spree_section_content}>喜腾送你的圣诞礼物，免费抽签抢100g金条！每周二、周四、周日22:00揭晓中签，选中双色球就送，下载喜腾抢购APP即可免费参与，赶紧去下载吧！</div>
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
