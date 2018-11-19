/**
 * Created by zhulizhe on 2018/11/17.
 */

import styles from './page.css'
const loadingIcon = 'http://pax4lf8m2.bkt.clouddn.com/xiteng_loading.gif' ;
export const ActivityIndicator = ({animating})=>{
  if(!animating)return null ;
  return <div className={styles.activityIndicator}>
    <img className={styles.loading_icon} src={loadingIcon} alt=""/>
  </div>
}
