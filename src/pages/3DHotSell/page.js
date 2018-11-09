import React from 'react';
import { connect } from 'dva';
import styles from './page.css';
import icon_shouye_honghuo from '../../assets/icon_shouye_honghuo@3x.png';
import { Toast,ActivityIndicator} from 'antd-mobile';

function HotSellView (props) {
  const {list} = props.store;
  const hotSellListItem = list.map((item,i)=>{
    return (
      <div className={styles.hot_sell_list_item} key={i}>
        <div className={styles.hot_sell_list_item_left}>
          <img src={item.productImageUrl} alt=""/>
        </div>
        <div className={styles.hot_sell_list_item_right}>
          <div className={styles.hot_sell_list_item_right_shopname}>{item.productName}</div>
          <div className={styles.hot_sell_list_item_right_sold}><img src={icon_shouye_honghuo} alt=""/>已抢{item.currentPurchaseCount}万件</div>
          <div className={styles.hot_sell_list_item_right_price}>
                <span>
                  <span className={styles.hot_sell_price_left_zero}>0元抢</span>
                  <span className={styles.hot_sell_price_left_rmb}>￥<big>{item.originalPrice/100}</big></span>
                </span>
            <span className={styles.hot_sell_price_right}>马上抢</span>
          </div>
        </div>
      </div>
    )
  });
  return(
    <div className={styles.hot_sell_container}>
      <div className={styles.hot_sell_head}>
        <div className={styles.hot_sell_headbg}> </div>
        <div className={styles.hot_sell_head_main}>
          <div>揭晓中签：每天22:00</div>
          <div>距揭晓<span>10</span>:<span>20</span>:<span>09</span></div>
          <div>选福彩3D号码，中签即免费送，不中签全额团款（也可全额购买）商品均来源于天猫。</div>
        </div>
      </div>
      <div className={styles.hot_sell_section}>
        <div className={styles.hot_sell_section_tit}>3D-0元抢购精选</div>
        <div className={styles.hot_sell_list}>
          {hotSellListItem}
        </div>
      </div>
      <ActivityIndicator
        color="white"
        toast
        animating={props.loading}
      />
    </div>
  )
}

export default connect(state => ({
  store:state.hotsell,
  loading: state.loading.global
}))(HotSellView);
