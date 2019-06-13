import React from 'react';
import {connect} from 'dva';
import styles from './page.css';
import {routerRedux} from 'dva/router';
import DocumentTitle from 'react-document-title';

import icon_man from "../../assets/astro/icon_man@2x.png";
import icon_man_h from "../../assets/astro/icon_man_h@2x.png";
import icon_woman from "../../assets/astro/icon_woman@2x.png";
import icon_woman_h from "../../assets/astro/icon_woman_h@2x.png";
import icon_ziliao_xuanhao from "../../assets/astro/icon_ziliao_xuanhao@2x.png"

function ImprovePersonalData(props) {
  const {selectedSex,selectAstro} = props.astro ;
  // console.log('setSelectSex ImprovePersonalData',setSelectSex);
  // console.log('selectAstro ',selectAstro);
  // console.log('astro ',props.astro);
  return (
    <DocumentTitle title='完善个人资料'>
      <div>
        <div className={styles.improve_data}>
          <div className={styles.improve_data_tit}>请完善个人资料</div>
          <div className={styles.improve_data_content}>
          <span className={selectedSex===1 ? styles.improve_data_content_man:styles.improve_data_content_sex} onClick={()=>{
            props.dispatch({
              type:'astro/setSelectSex',
              payload:1
            })
          }}><img src={selectedSex===1 ? icon_man_h : icon_man} alt=""/><span>我是男生</span></span>
            <span className={selectedSex===2?styles.improve_data_content_man:styles.improve_data_content_sex} onClick={()=>{
              props.dispatch({
                type:"astro/setSelectSex",
                payload:2
              })
            }
            }><img src={selectedSex===2?icon_woman_h:icon_woman} alt=""/><span>我是女生</span></span>
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
             <span>{props.astro.selectAstro==null?"请选择":selectAstro.cName}</span>
           </span>
            <img className={styles.improve_data_content_ziliao_xuanhao} src={icon_ziliao_xuanhao} alt=""/>
          </div>
        </div>
        <div className={styles.improve_data_finished}
             onClick={()=>{
               props.dispatch({
                 type:"astro/constellation",
                 cb:()=>{
                   props.dispatch(routerRedux.goBack());
                 }
               })
             }}
        >完成</div>
      </div>
    </DocumentTitle>

  );
}

export default connect(state => {
  return {
    astro: state.astro
  };
})(ImprovePersonalData);

