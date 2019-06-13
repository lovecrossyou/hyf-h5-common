import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import styles from './page.css';
import {ActivityIndicator} from "../../components/ActivityIndicator";
import rmbimg from '../../assets/renminbi.png';

function BillingDetails(props) {
  const { billings, currencyType, accountInfo } = props.store;
  if (billings.length === 0) return null;
  const billingDetails = billings.map((item, i) => {
    return <div key={i}>
      <div className={styles.billilng_details_section_head}>
        <span>{item.monthTime}月</span>
        <span>￥{currencyType === 3 ? item.totalAmount / 100 : item.totalAmount}</span>
      </div>
      {
        item.dayBills.map((dayBills, j) => {
          return <div className={styles.billilng_details_section_item} key={j}>
            <div className={styles.billilng_details_section_item_data}>
              <div>{dayBills.description}</div>
              <div className={styles.billilng_details_section_item_data_second}>{currencyType == 3 ? (dayBills.amount / 100) : (dayBills.amount)}</div>
            </div>
            <div className={styles.billilng_details_section_item_data_specific}>
              <div><span className={styles.mr10}>{dayBills.date}</span><span>{dayBills.time}</span></div>
              <div></div>
            </div>
              <img src={rmbimg} alt=""/>
          </div>
        })
      }
    </div>;
  });
  return (
    <DocumentTitle title='账单明细'>
      <div>
        <ActivityIndicator
          animating={props.loading}
        />
        <div className={styles.billing_details_container}>
          <div className={styles.billing_details_header}>
            <div className={currencyType === 3 ? styles.billing_details_header_item_active : styles.billing_details_header_item} onClick={() => {
              props.dispatch({
                type: "wallet/fetchBillings",
                payload: {
                  currencyType: 3
                }
              })
            }}>
              <h4>人民币</h4>
              <div>余额：￥<span>{accountInfo.rmbAmount / 100}</span></div>
            </div>
            <div className={currencyType === 1 ? styles.billing_details_header_item_active : styles.billing_details_header_item} onClick={() => {
              props.dispatch({
                type: "wallet/fetchBillings",
                payload: {
                  currencyType: 1
                }
              })
            }}>
              <h4>喜币</h4>
              <div>余额：$<span>{accountInfo.xtbTotalAmount}</span></div>
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

















