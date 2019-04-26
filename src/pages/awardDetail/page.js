import React from 'react';
import { connect } from 'dva';
import styles from './page.css'
function AwardDetail(props) {
  return <div>
    <img className={styles.img} src={props.activeInfo.awards.picture} alt=""/>
  </div>
}

export default connect(state=>{
  return {
    activeInfo:state.global.activeInfo
  }
})(AwardDetail)
