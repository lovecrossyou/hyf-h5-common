import React from 'react';
import { connect } from 'dva';
import styles from './page.css';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';
import {ActivityIndicator} from "../../components/ActivityIndicator";
import { EmptyData } from './thePrizeForDetails';

function ZeroPriceForDetails(props) {
  const {dataSSQ} = props.store ;
  if(dataSSQ===null){
    return <ActivityIndicator
      color="white"
      toast
      animating={props.loading}
    />
  }

  const {lotteryStage,winCodeCount,winUserCount,winUserInfoModelList,zeroGameWinDetailModel} = dataSSQ ;

  const luckyguy = Object.keys(zeroGameWinDetailModel).forEach((key) => {
    console.log(key)
    }
  );

  return <DocumentTitle title='中签详情'>
    <div>
      <div className={styles.price_details_container}>
        <div className={styles.price_details_head}>
          <div className={styles.price_details_tit}>0元抢金条第{lotteryStage}期</div>
          <div className={styles.price_details_tit_intro}
               onClick={()=>{
                 props.dispatch(routerRedux.push('/awardDetail/page'))
               }}
          >奖品详情>></div>
          <div className={styles.price_details_num}>中签人数：{winUserCount}人<span>|</span>中签注数：{winCodeCount}注</div>
        </div>
        {winCodeCount===0? (<EmptyData hasData={false}/>) : (<div className={styles.price_details_section}>
          <div className={styles.price_zero_details_section_item}>
            <div className={styles.price_details_section_title}>一等奖（{zeroGameWinDetailModel.firstWinCodeCount}注）</div>
            {
              zeroGameWinDetailModel.firstWinUserInfoModel.map((item,i)=>{
                return <div className={styles.price_details_section_item}>
                    <span className={styles.price_details_section_item_headportrait}>
                      <img src={item.winUserIconUrl} alt=""/>
                    </span>
                  <span className={styles.price_details_section_item_name}>{item.winUserName}</span>
                  <span className={styles.price_details_section_item_num}>{item.winCodeCount}注</span>
                  <span>{item.productName}</span>
                </div>
              })
            }
          </div>
          <div className={styles.price_zero_details_section_item}>
            <div className={styles.price_details_section_title}>二等奖（{zeroGameWinDetailModel.secondWinCodeCount}注）</div>
            {
              zeroGameWinDetailModel.secondWinUserInfoModel.map((item,i)=>{
                return <div className={styles.price_details_section_item}>
                    <span className={styles.price_details_section_item_headportrait}>
                      <img src={item.winUserIconUrl} alt=""/>
                    </span>
                  <span className={styles.price_details_section_item_name}>{item.winUserName}</span>
                  <span className={styles.price_details_section_item_num}>{item.winCodeCount}注</span>
                  <span>{item.productName}</span>
                </div>
              })
            }
          </div>
          <div className={styles.price_zero_details_section_item}>
            <div className={styles.price_details_section_title}>三等奖（{zeroGameWinDetailModel.thirdWinCodeCount}注）</div>
            {
              zeroGameWinDetailModel.thirdWinUserInfoModel.map((item,i)=>{
                return <div className={styles.price_details_section_item}>
                    <span className={styles.price_details_section_item_headportrait}>
                      <img src={item.winUserIconUrl} alt=""/>
                    </span>
                  <span className={styles.price_details_section_item_name}>{item.winUserName}</span>
                  <span className={styles.price_details_section_item_num}>{item.winCodeCount}注</span>
                  <span>{item.productName}</span>
                </div>
              })
            }
          </div>
          <div className={styles.price_zero_details_section_item}>
            <div className={styles.price_details_section_title}>四等奖（{zeroGameWinDetailModel.fourthWinCodeCount}注）</div>
            {
              zeroGameWinDetailModel.fourthWinUserInfoModel.map((item,i)=>{
                return <div className={styles.price_details_section_item}>
                    <span className={styles.price_details_section_item_headportrait}>
                      <img src={item.winUserIconUrl} alt=""/>
                    </span>
                  <span className={styles.price_details_section_item_name}>{item.winUserName}</span>
                  <span className={styles.price_details_section_item_num}>{item.winCodeCount}注</span>
                  <span>{item.productName}</span>
                </div>
              })
            }
          </div>
          <div className={styles.price_zero_details_section_item}>
            <div className={styles.price_details_section_title}>五等奖（{zeroGameWinDetailModel.fifthWinCodeCount}注）</div>
            {
              zeroGameWinDetailModel.fifthWinUserInfoModel.map((item,i)=>{
                return <div className={styles.price_details_section_item}>
                    <span className={styles.price_details_section_item_headportrait}>
                      <img src={item.winUserIconUrl} alt=""/>
                    </span>
                  <span className={styles.price_details_section_item_name}>{item.winUserName}</span>
                  <span className={styles.price_details_section_item_num}>{item.winCodeCount}注</span>
                  <span className={styles.price_details_section_item_productname}>{item.productName}</span>
                </div>
              })
            }
          </div>
        </div>)}

      </div>
    </div>
  </DocumentTitle>
}

export default connect(state=>{
  return {
    store: state.award,
    loading:state.loading.global
  }
})(ZeroPriceForDetails)
