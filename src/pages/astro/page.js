import React from 'react';
import Link from 'umi/link';

import {connect} from 'dva';
import { AstroItem } from './components/AstroItem';
import styles from './page.css';
import BG_photo_xingzuo from '../../assets/astro/BG_photo_xingzuo@2x.png'

function Astro(props) {
  return (
    <div className={styles.astrology_container}>
      <div className={styles.astrology}>您还没有选择您的星座</div>
      <div className={styles.choose_astrology}>

        <Link to="./components/AstroItem"><button>选择星座</button></Link>
      </div>
    </div>
  );
}

export default connect(state => {
  console.log(state);
  return {
    pageData: state.main
  };
})(Astro);
