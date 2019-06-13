import React from 'react'
import styles from './404.less'
import {connect} from 'dva';

export default connect()(({dispatch}) => {
  return (
    <div className={styles.error}>
     <div className={styles.logoContainer}>
       <div className={styles.logo}/>
     </div>
      <h4 style={{marginTop: '20px', color: '#999999'}}>升级维护中...</h4>
    </div>
  );
});

