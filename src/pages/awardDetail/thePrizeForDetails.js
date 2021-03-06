import React from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';


import styles from './page.css';
import emptyBg from '../../assets/bqku.png'
import {ActivityIndicator} from "../../components/ActivityIndicator";


export const EmptyData = ({hasData=false})=>{
  if(hasData===true)return null ;
  return <div>
    <img src={emptyBg} alt="" className={styles.emptyBg}/>
  </div>
}

function ThePriceForDetails(props) {
  const {data3D} = props.store ;

  if(data3D===null){
    return <ActivityIndicator
      color="white"
      toast
      animating={props.loading}
    />
  }

  const {lotteryStage,winCodeCount,winUserCount,winUserInfoModelList} = data3D ;

  return <DocumentTitle title='中签详情'>
    <div>
      <div className={styles.price_details_container}>
        <div className={styles.price_details_head}>
          <div className={styles.price_details_tit}>3D-抽签抢购第{lotteryStage}期</div>
          <div className={styles.price_details_num}>中签人数：{winUserCount}人<span>|</span>中签注数：{winCodeCount}注</div>
        </div>
        {
          winUserInfoModelList.map((data,index)=>{
            return (
              <div className={styles.price_details_section}>
                <div className={styles.price_details_section_item}>
                  <span className={styles.price_details_section_item_headportrait}>
                    <img src={data.winUserIconUrl} alt=""/>
                  </span>
                  <span className={styles.price_details_section_item_name}>{data.winUserName}</span>
                  <span className={styles.price_details_section_item_num}>{data.winUserPurchaseCount}注</span>
                  <span>{data.productName} {data.winCount}件</span>
                </div>
              </div>
            )
          })
        }
        <EmptyData hasData={winUserCount!==0}/>
      </div>
    </div>
  </DocumentTitle>;
}

export default connect(state => {
  return {
    store: state.award,
    loading:state.loading.global
  };
})(ThePriceForDetails);
