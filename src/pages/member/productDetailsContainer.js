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
    const {vipProductDetail,vipProductPurchaseInfo} = this.props.store ;
    if(vipProductDetail === null)return null;

    const {imageUrl,price,saleMount,subtitle,vipProductId,productName,productDetailImageUrlList,productShowImageUrlList} = vipProductDetail ;
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
              {productShowImageUrlList.map(val => (
                <a
                  key={val}
                  href="http://www.alipay.com"
                  style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                  <img
                    src={val}
                    alt=""
                    width='100%'
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
            <div className={styles.product_details_carousel_intro_price_left}>￥<big>{price/100.0}</big></div>
            <div className={styles.product_details_carousel_intro_price_right}>
              <p><img src={fire} alt=""/>166人正在抢</p>
              <p className={styles.product_details_carousel_intro_price_right_small}>已抢12万份数</p>
            </div>
          </div>
          <div className={styles.product_details_carousel_intro}>
            <p><img src={huiyuanzhuangong} alt=""/>{productName}</p>
            <p>{subtitle}</p>
          </div>
        </div>
        <div className={styles.product_details_list}>
          <div className={styles.buying_spree}>
            <span>正在抢购</span>
            <span>抢购详情 <img src={icon_left} alt=""/></span>
          </div>
          {
            vipProductPurchaseInfo.map((info,index)=>{
              return (
                <div key={index+'#'} className={styles.buying_spree_list}>
                  <div className={styles.buying_spree_list_left}>
                    <img src={info.userIconUrl}  alt='' className={styles.buying_spree_list_left_img}/>
                    <div className={styles.buying_spree_list_left_gold}>{info.userName}</div>
                    <img className={styles.buying_spree_list_left_sex} src={woman} alt=""/>
                  </div>
                  <div className={styles.buying_spree_list_right}>
                    <span className={styles.buying_spree_list_right_time}>{info.paidTime}</span>
                    <span>抢购{info.purchaseCount}份数</span>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className={styles.product_details_list}>
          <div className={styles.buying_spree}>商品详情</div>
          <div style={{width:"100%",backgroundColor:"pink",padding:"0"}}>
            {
              productDetailImageUrlList.map((p,index)=>{
                return (
                  <img src={p.productDetailImageUrl} width='100%' alt=""/>
                )
              })
            }
          </div>
        </div>
      </div>
    </DocumentTitle>
  }
}

export default connect(state=>{
  return {
    store:state.member
  }
})(ProductDetailsContainer)
