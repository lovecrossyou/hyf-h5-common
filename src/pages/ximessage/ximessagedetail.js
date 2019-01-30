import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import styles from './page.css';
import {ActivityIndicator} from "../../components/ActivityIndicator";
import xiteng from '../../assets/xiteng.jpg';

function XiMessageDetail(props){
  const {messageData} = props.store;
  if(Object.keys(messageData).length === 0) return null;
  const messageDetailsContainer = messageData.content.map((product,i)=>{
    return <div className={styles.Xi_message_detail_container_item} key={i}>
      <div className={styles.Xi_message_detail_container_item_tit}>{product.time}</div>
      <div className={styles.Xi_message_detail_container_item_sec}>
        <div className={styles.Xi_message_detail_container_item_sec_left}>
          <img src={xiteng} alt=""/>
        </div>
        <div className={styles.Xi_message_detail_container_item_sec_right}>
          <div>{product.content}</div>
        </div>
      </div>
    </div>
  });
  return(
    <DocumentTitle title='账单明细'>
      <div>
        <ActivityIndicator
          animating={props.loading}
        />
        <div className={styles.Xi_message_detail_container}>
          {messageDetailsContainer}

        </div>
      </div>
    </DocumentTitle>
  )
}
export default connect(state => ({
  store:state.message
}))(XiMessageDetail);
