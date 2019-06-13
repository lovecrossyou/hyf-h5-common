import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';
import manIcon from '../../assets/man_icon.png';
import womanIcon from '../../assets/woman_icon.png';
import xiangqing from '../../assets/xiangqing@2x.png'
import styles from './page.css'

const Sex =({sex})=>{
  if(sex === 'man'){
    return <div>
      <img src={manIcon} alt="" className={styles.sex_icon}/>
    </div>
  }else if(sex === 'woman') {
    return <div>
      <img src={womanIcon} alt="" className={styles.sex_icon}/>
    </div>
  }else {
    return null
  }
};


class buyDetail extends Component {
  render(){
    const buy_detail_list = this.props.store ;
    console.log(buy_detail_list.purchaseInfo);

    if(buy_detail_list.purchaseInfo.length ===0){
      return <div className={styles.not_goods}>
        <img src={xiangqing} alt="" className={styles.not_goods_img}/>
      </div>
    }

    return(
      <DocumentTitle title='抢购详情'>
        <div className={styles.buy_detail_wrapper}>
          <div>
            {buy_detail_list.purchaseInfo.map((data,index) => {
              return (
                <div className={styles.buy_detail_list} key={index}>
                  <div className={styles.buy_user_img}><img src={data.userIconUrl} alt=""/></div>
                  <div className={styles.buy_user_detail}>
                    <div className={styles.buy_user_name}>
                      {data.userName}
                      <Sex sex={data.sex}/>
                    </div>
                    <div className={styles.user_buy_date}>{data.paidTime}</div>
                  </div>
                  <div className={styles.buy_count}>抢购{data.purchaseCount}份</div>
                </div>
              )
            })
            }
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

export default connect(state=>{
  return {
    store:state.buyDetail
  }
})(buyDetail)
