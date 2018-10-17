import React from 'react';
import Link from 'umi/link';

import {connect} from 'dva';
import styles from './page.css';
import {routerRedux} from 'dva/router';

import BG_photo_xingzuo from '../../assets/astro/BG_photo_xingzuo@2x.png'

function Astro(props) {
  const {selectAstro} = props.store ;
  if(selectAstro==null){
    return (
      <div className={styles.astrology_container}>
        <div className={styles.astrology}>您还没有选择您的星座</div>
        <div className={styles.choose_astrology}>
          <button onClick={()=>{
            props.dispatch(routerRedux.push('/astro/AstroItem'))

          }}>选择星座</button>
        </div>
      </div>
    );
  }
  return <div>
    {JSON.stringify(selectAstro)}
  </div>

}

export default connect(state => {
  console.log(state);
  return {
    store: state.astro
  };
})(Astro);
