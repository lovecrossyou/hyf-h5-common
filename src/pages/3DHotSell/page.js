import React from 'react';
import { connect } from 'dva';
import styles from './page.css';
import icon_shouye_honghuo from '../../assets/icon_shouye_honghuo@3x.png';
import DocumentTitle from 'react-document-title';
import util from '../../utils/util'
import {ActivityIndicator} from "../../components/ActivityIndicator";

class HotSellView extends React.Component{

  state= {
    timeObj:null
  }

  componentDidMount(){
    this.timer = setInterval(()=>{
      const { list } = this.props.store;
      if(list.length!=0){
        let p = list[0] ;
        var openResultTime = p.openResultTime ;
        let timeObj = util.showTickTime(openResultTime);
        console.log(timeObj);
        this.setState({
          timeObj:timeObj
        })
      }
    },1000);
  }


  componentWillUnmount(){
    clearInterval(this.timer);
  }

  render(){
    const { list } = this.props.store;
    const {timeObj} = this.state ;
    if(timeObj==null)return null;
    const hotSellListItem = list.map((item, i) => {
      // console.log(item)
      return (
        <div className='hot_sell_list_item' key={i} itemID={item.discountGameId}>
          <div className={styles.hot_sell_list_item_left}>
            <img src={item.productImageUrl} alt=""/>
          </div>
          <div className={styles.hot_sell_list_item_right}>
            <div className={styles.hot_sell_list_item_right_shopname}>{item.productName}</div>
            <div className={styles.hot_sell_list_item_right_sold}><img src={icon_shouye_honghuo}
                                                                       alt=""/>已抢{item.relatedProductSaleMount}件
            </div>
            <div className={styles.hot_sell_list_item_right_price}>
                <span>
                  <span className={styles.hot_sell_price_left_zero}>3D抢</span>
                  <span className={styles.hot_sell_price_left_rmb}>￥<big>{item.originalPrice / 100}</big></span>
                </span>
              <span className={styles.hot_sell_price_right}>马上抢</span>
            </div>
          </div>
        </div>
      );
    });
    return (
      <DocumentTitle title='3D抢购精选'>
        <div className={styles.hot_sell_container}>
          <ActivityIndicator
            color="white"
            toast
            animating={this.props.loading}
          />
          <div className={styles.hot_sell_head}>
            <div className={styles.hot_sell_headbg}></div>
            <div className={styles.hot_sell_head_main}>
              <div>揭晓中签：每天22:00</div>
              <div>距揭晓<span>{timeObj.hour}</span>:<span>{timeObj.minute}</span>:<span>{timeObj.sec}</span></div>
              <div>选福彩3D号码，中签即免费送，不中签全额退款（也可全额购买）商品均来源于天猫。</div>
            </div>
          </div>
          <div className={styles.hot_sell_section}>
            <div className={styles.hot_sell_section_tit}>3D抢购精选</div>
            <div className={styles.hot_sell_list}>
              {hotSellListItem}
            </div>
          </div>
        </div>
      </DocumentTitle>

    );
  }
}

export default connect(state => ({
  store: state.hotsell,
  loading: state.loading.global,
}))(HotSellView);
