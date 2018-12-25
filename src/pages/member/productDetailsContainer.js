import React from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';

import styles from './productDetailsContainer.css';
import { Carousel, WingBlank } from 'antd-mobile';
import fire from "../../assets/fire.png"
import huiyuanzhuangong from "../../assets/huiyuanzhuangong.png"
import icon_left from "../../assets/me_arrow@2x.png"
import man from "../../assets/man.png"
import woman from "../../assets/woman.png"

class ProductDetailsContainer extends React.Component{
  state = {
    data: ['1', '2', '3'],
    imgHeight: 206,
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }
  render(){
    return <DocumentTitle title='商品详情'>
      <div className={styles.product_details_container}>
        <div className={styles.product_details_carousel_wrapper}>
          <WingBlank style={{margin:0}}  >
            <Carousel
              autoplay={false}
              infinite
              beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
              afterChange={index => console.log('slide to', index)}
            >
              {this.state.data.map(val => (
                <a
                  key={val}
                  href="http://www.alipay.com"
                  style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                  <img
                    src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event('resize'));
                      this.setState({ imgHeight: 'auto' });
                    }}
                  />
                </a>
              ))}
            </Carousel>
          </WingBlank>
          <div className={styles.product_details_carousel_intro_price}>
            <div className={styles.product_details_carousel_intro_price_left}>￥<big>39</big></div>
            <div className={styles.product_details_carousel_intro_price_right}>
              <p><img src={fire} alt=""/>166人正在抢</p>
              <p className={styles.product_details_carousel_intro_price_right_small}>已抢12万份数</p>
            </div>
          </div>
          <div className={styles.product_details_carousel_intro}>
            <p><img src={huiyuanzhuangong} alt=""/>喜腾定制水晶保温杯</p>
            <p>赠送抽签抢黄金一年，每期2注</p>
          </div>
        </div>
        <div className={styles.product_details_list}>
          <div className={styles.buying_spree}>
            <span>正在抢购</span>
            <span>抢购详情 <img src={icon_left} alt=""/></span>
          </div>
          <div className={styles.buying_spree_list}>
            <div className={styles.buying_spree_list_left}>
              <div className={styles.buying_spree_list_left_img}>a</div>
              <div className={styles.buying_spree_list_left_gold}>点石成金</div>
              <img  className={styles.buying_spree_list_left_sex} src={woman} alt=""/>
            </div>
            <div className={styles.buying_spree_list_right}>
              <span className={styles.buying_spree_list_right_time}>时间</span>
              <span>抢购份数</span>
            </div>
          </div>
          <div className={styles.buying_spree_list}>
            <div className={styles.buying_spree_list_left}>
              <div className={styles.buying_spree_list_left_img}>a</div>
              <div className={styles.buying_spree_list_left_gold}>点石成金</div>
              <img  className={styles.buying_spree_list_left_sex} src={woman} alt=""/>
            </div>
            <div className={styles.buying_spree_list_right}>
              <span className={styles.buying_spree_list_right_time}>时间</span>
              <span>抢购份数</span>
            </div>
          </div>
        </div>
        <div className={styles.product_details_list}>
          <div className={styles.buying_spree}>商品详情</div>
          <div style={{width:"100%",height:"500px",backgroundColor:"pink",padding:"0"}}>22</div>
        </div>
      </div>
    </DocumentTitle>
  }
}

export default connect(state=>{
  return {

  }
})(ProductDetailsContainer)
