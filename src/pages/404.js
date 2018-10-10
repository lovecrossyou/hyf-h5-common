import React from 'react'
import styles from './404.less'
import {connect} from 'dva';
import devIcon from '../assets/dev-page.png'

export default connect()(({dispatch}) => {
  return (
    <div className={styles.error}>
     <div className={styles.logoContainer}>
       <div className={styles.logo}/>
     </div>
      <h4 style={{marginTop: '20px', color: '#999999'}}>程序猿加紧开发中...</h4>
    </div>
  );
});

