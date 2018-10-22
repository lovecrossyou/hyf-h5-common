import React from 'react';
import {connect} from 'dva';
import styles from './page.css';
import {routerRedux} from 'dva/router';
import {Button} from 'antd';

import icon_man from "../../assets/astro/icon_man@2x.png";
import icon_woman from "../../assets/astro/icon_woman@2x.png";
import bg_icon_shuangyu from "../../assets/astro/bg_icon_shuangyu@2x.png"
import icon_ziliao_xuanhao from "../../assets/astro/icon_ziliao_xuanhao@2x.png"

function ImprovePersonalData(props) {
  return (
    <div>
      <div className={styles.improve_data}>
        <div className={styles.improve_data_tit}>请完善个人资料</div>
        <div className={styles.improve_data_content}>
          <span className={styles.improve_data_content_sex} onClick={()=>{
            console.log('addColor');

          }}><img src={icon_man} alt=""/><span>我是男生</span></span>
          <span className={styles.improve_data_content_sex}><img src={icon_woman} alt=""/><span>我是女生</span></span>
        </div>
      </div>
      <div className={styles.improve_data}>
        <div className={styles.improve_data_tit}>我的星座</div>
        <div className={styles.improve_data_content}
             id={styles.improve_data_astro_content}
             onClick={()=>{
               props.dispatch(routerRedux.push('/astro/AstroItem'))
             }}
        >
           <span className={styles.improve_data_content_ziliao}>
             <img className={styles.improve_data_content_ziliao_astro} src={props.astro.selectAstro==null?'/static/icon_bg_shuangyu@2x.be7cbc3a.png':props.astro.selectAstro.img} alt=""/>
             <span>{props.astro.selectAstro==null?"双鱼座":props.astro.selectAstro.cName}</span>
           </span>
          <span><img className={styles.improve_data_content_ziliao_xuanhao} src={icon_ziliao_xuanhao} alt=""/></span>
        </div>
      </div>
      <div className={styles.improve_data_finished}>完成</div>
    </div>
  );
}

export default connect(state => {
  return {
    astro: state.astro
  };
})(ImprovePersonalData);

