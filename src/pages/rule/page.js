import React from 'react';
import { connect } from 'dva';
import styles from './page.css'
function Rule(props) {
  return <div>
    <img className={styles.img} src={props.store.page_src} alt=""/>
  </div>
}

export default connect(state=>{
  return {
    store:state.rule
  }
})(Rule)
