import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
// import styles from './page.css';
import {ActivityIndicator} from "../../components/ActivityIndicator";

function BankView(props){
  return(
    <DocumentTitle title='银行卡号'>
      <div>
        <ActivityIndicator
          color="white"
          toast
          animating={props.loading}
        />
        <div>
          银行
        </div>
      </div>
    </DocumentTitle>
  )
}
export default connect(state => ({

}))(BankView);

















