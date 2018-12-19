import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import styles from './page.css';
import {ActivityIndicator} from "../../components/ActivityIndicator";
import xiteng from '../../assets/xiteng.jpg';
import { routerRedux } from 'dva/router';


function XiMessage(props){
  const {messageData} = props.store;
  if(Object.keys(messageData).length === 0) return null;
  console.log('=========sssssssssss====',messageData);
  return(
    <DocumentTitle title='账单明细'>
      <div>
        <ActivityIndicator
          animating={props.loading}
        />
        <div className={styles.Xi_message_container}>
          <div className={styles.Xi_message_section} onClick={()=>{
             props.dispatch(routerRedux.push('/ximessage/ximessagedetail'))
          }}>
            <div className={styles.Xi_message_section_item_left}>
              <img src={xiteng} alt=""/>
              <div className={styles.left_message}>2</div>
            </div>
            <div className={styles.Xi_message_section_item_right}>
              <div className={styles.Xi_message_section_item_right_tit}>
                <span>喜腾公告</span>
                <span className={styles.right_tit_small}>{messageData.content[0].time}</span>
              </div>
              <div className={styles.Xi_message_section_item_right_content}>{messageData.content[0].content}</div>
            </div>
          </div>
        </div>
      </div>
    </DocumentTitle>
  )
}
export default connect(state => ({
  store:state.message
}))(XiMessage);
