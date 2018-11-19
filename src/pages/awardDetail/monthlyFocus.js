import React from 'react';
import { connect } from 'dva';
import styles from './page.css';
import DocumentTitle from 'react-document-title';
import icon_guan from '../../assets/icon_guan@3x.png'
import icon_ji from '../../assets/icon_ji@3x.png'
import icon_ya from '../../assets/icon_ya@3x.png'

function MonthlyFocus(props) {
  const {zerogold} = props.store;
  return <DocumentTitle title='榜单'>
    <div className={styles.monthly_focus_container}>
      <div className={styles.monthly_focus_title}>
          <div className={zerogold?styles.bdb6:""} onClick={()=>{
             props.dispatch({
               type:"award/zeroGold"
             })
          }}>0元抢金条</div>
          <div className={zerogold?"":styles.bdb6} onClick={()=>{
            props.dispatch({
              type:"award/zeroGold3D"
            })
          }}>3D-0元抢购</div>
      </div>
      <div className={styles.monthly_focus_section}>
        <div className={styles.monthly_focus_section_list_tit_box}>
          <div className={styles.monthly_focus_section_list_tit}>
            <div className={styles.monthly_focus_section_list_tit_left}>
              <div>7</div>
              <div className={styles.monthly_focus_section_list_avatar}>

              </div>
              <div className={styles.monthly_focus_section_list_name}>高阳</div>
            </div>
            <div className={styles.monthly_focus_section_list_portion}><span>1200</span>份</div>
          </div>
        </div>
        <div className={styles.monthly_focus_section_list}>
            <div className={styles.monthly_focus_section_list_item}>
              <div className={styles.monthly_focus_section_list_tit_left}>
                <div className={styles.monthly_focus_section_list_guan}>
                  <img src={icon_guan} alt=""/>
                </div>
                <div className={styles.monthly_focus_section_list_avatar}>

                </div>
                <div className={styles.monthly_focus_section_list_name}>高阳</div>
              </div>
              <div className={styles.monthly_focus_section_list_portion}><span>1200</span>份</div>
            </div>
          <div className={styles.monthly_focus_section_list_item}>
            <div className={styles.monthly_focus_section_list_tit_left}>
              <div className={styles.monthly_focus_section_list_guan}>
                <img src={icon_ya} alt=""/>
              </div>
              <div className={styles.monthly_focus_section_list_avatar}>

              </div>
              <div className={styles.monthly_focus_section_list_name}>高阳</div>
            </div>
            <div className={styles.monthly_focus_section_list_portion}><span>1200</span>份</div>
          </div>
          <div className={styles.monthly_focus_section_list_item}>
            <div className={styles.monthly_focus_section_list_tit_left}>
              <div className={styles.monthly_focus_section_list_guan}>
                <img src={icon_ji} alt=""/>
              </div>
              <div className={styles.monthly_focus_section_list_avatar}>

              </div>
              <div className={styles.monthly_focus_section_list_name}>高阳</div>
            </div>
            <div className={styles.monthly_focus_section_list_portion}><span>1200</span>份</div>
          </div>
        </div>
      </div>
    </div>
  </DocumentTitle>
}

export default connect(state=>{
  return {
    store: state.award,
    loading:state.loading.global
  }
})(MonthlyFocus)
