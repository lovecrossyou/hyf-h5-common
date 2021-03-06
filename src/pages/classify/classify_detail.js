import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './classify_detail.css';
import notGoods from '../../assets/classify/shangpin@2x.png'
import ClassifyFilter from './components/ClassifyFilter';


class ClasifyDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      needIndex:0,
      sortNum: 1
    };
  }
  componentDidMount () {
    console.log(this.state)
  }
  newslistclick(val){
    console.log(val);
    this.setState({
      needIndex:val
    })
  }



  render() {
    const product_categor_list = this.props.store ;
    console.log(product_categor_list.productOfSecondCategory);

    if(product_categor_list.productOfSecondCategory.length === 0){
      return <div className={styles.not_goods}>
        <img src={notGoods} alt="" className={styles.not_goods_img}/>
      </div>
    }

    return (
      <div>
        {/*条件排序*/}
        <ClassifyFilter/>
        {/*商品列表*/}
        <div className={styles.product_categor_wrapper}>
          {product_categor_list.productOfSecondCategory.map((data, index) => {
            return (
              <div className='product_categor_cont' key={index} itemID={data.discountGameId}>
                <div className={styles.product_categor_img}>
                  <img src={data.productImageUrl} alt=""/>
                </div>
                <div className={styles.product_categor_cont_text}>
                  <div className={styles.product_categor_name}>{data.productName}</div>
                  <div className={styles.all_price}>
                    <div className={styles.categor_original_price}>¥{data.originalPrice/100}</div>
                    {/*<div className={styles.product_categor_price}>¥{data.originalPrice/100}</div>*/}
                  </div>
                </div>
              </div>
            )
          })
          }
        </div>
      </div>

    );
  }
}

export default connect(state=>{
  return {
    store:state.classify
  }
})(ClasifyDetail)
