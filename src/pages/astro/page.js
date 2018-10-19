import React from 'react';

import {connect} from 'dva';
import styles from './page.css';
import {routerRedux} from 'dva/router';
import DocumentTitle from 'react-document-title'
import BG_photo_xingzuo from '../../assets/astro/BG_photo_xingzuo@2x.png'

function Astro(props) {
  const {selectAstro} = props.store ;
  if(selectAstro==null){
    return (
      <DocumentTitle title={props.title}>
      <div className={styles.astrology_container}>
        <div className={styles.astrology}>您还没有选择您的星座</div>
        <div className={styles.choose_astrology}>
          <button onClick={()=>{
            props.dispatch(routerRedux.push('/astro/AstroItem'))
          }}>选择星座</button>
        </div>
      </div>
      </DocumentTitle>
    );
  }
  return (
    <DocumentTitle title={props.title}>
      <div className={styles.astrology_container}>
        <div className={styles.astrology}>您还没有选择您的星座</div>
        <div className={styles.choose_astrology}>
          <button onClick={()=>{
            props.dispatch(routerRedux.push('/astro/AstroItem'))
          }}>选择星座</button>
        </div>
      </div>
    </DocumentTitle>
  )
}

export default connect(state => {
  return {
    store: state.astro,
    title:state.global.text
  };
})(Astro);
//   Aquarius(0, "水瓶座"),
//   Pisces(1, "双鱼座"),
//   Aries(2, "白羊座"),
//   Taurus(3, "金牛座"),
//   Gemini(4, "双子座"),
//   Cancer(5, "巨蟹座"),
//   Leo(6, "狮子座"),
//   Virgo(7, "处女座"),
//   Libra(8, "天秤座"),
//   Scorpio(9, "天蝎座"),
//   Sagittarius(10, "射手座"),
//   Capricorn(11, "摩羯座"),;
