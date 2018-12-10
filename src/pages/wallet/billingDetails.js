import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import styles from './page.css';
import {ActivityIndicator} from "../../components/ActivityIndicator";

function BillingDetails(props){
  const { billings , currencyType } = props.store;
  if( billings.length === 0)  return null ;
  const billingDetails = billings.map((item,i)=>{
    return <div key={i}>
      <div className={styles.billilng_details_section_head}>
        <span>{item.monthTime}月</span>
        <span>￥{item.totalAmount}</span>
      </div>
      {
        item.dayBills.map((dayBills,j)=>{
          return <div className={styles.billilng_details_section_item} key={j}>
            <div className={styles.billilng_details_section_item_data}>
              <div>{dayBills.date}</div>
              <div className={styles.billilng_details_section_item_data_second}>{dayBills.amount}</div>
            </div>
            <div className={styles.billilng_details_section_item_data_specific}>
              <div>{dayBills.time}</div>
              <div className={styles.billilng_details_section_item_data_specific_second}>{dayBills.description}</div>
            </div>
          </div>
        })
      }
    </div>;
  });
  return(
    <DocumentTitle title='账单明细'>
      <div>
        <ActivityIndicator
          color="white"
          toast
          animating={props.loading}
        />
        <div className={styles.billing_details_container}>
          <div className={styles.billing_details_header}>
            <div className={currencyType===3?styles.billing_details_header_item_active:styles.billing_details_header_item} onClick={()=>{
              props.dispatch({
                type:"wallet/fetchBillings",
                payload:{
                  currencyType:3
                }
              })
            }}>
              <h4>人民币</h4>
              <div>余额：￥<span>430</span></div>
            </div>
            <div className={currencyType===1?styles.billing_details_header_item_active:styles.billing_details_header_item} onClick={()=>{
              props.dispatch({
                type:"wallet/fetchBillings",
                payload:{
                  currencyType:1
                }
              })
            }}>
              <h4>喜币</h4>
              <div>余额：$<span>100</span></div>
            </div>
          </div>
          <div className={styles.billing_details_section}>
            {billingDetails}
          </div>
        </div>
      </div>
    </DocumentTitle>
  )
}
export default connect(state => ({
  store: state.wallet,
  loading: state.loading.global,
}))(BillingDetails);

















