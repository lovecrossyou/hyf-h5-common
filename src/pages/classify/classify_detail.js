import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './classify_detail.css';


class ClasifyDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      needIndex:0
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
  state = {
    sortNum: 1
  };
  setSortNum = (num) => {
    this.setState({
      sortNum: num
    });
  };


  render() {
    const product_categor_list = this.props.store ;
    console.log(product_categor_list.productOfSecondCategory);
    return (
      <div>
        {/*条件排序*/}
        <div className={styles.condition_wrapper}>
          <ul className={styles.condition_sort}>
            <li onClick={()=>this.setSortNum(1)} className={this.state.sortNum ===1?styles.sort_after:styles.sort_before}>综合</li>
            <li onClick={()=>this.setSortNum(2)} className={this.state.sortNum ===2?styles.sort_after:styles.sort_before}>
              价格
              <div className={styles.sort_icon_up}>
                <img src="../../assets/classify/icon_up@2x.png" alt=""/>
              </div>
              <div className={styles.sort_icon_down}>
                <img src="../../assets/classify/icon_down@2x.png" alt=""/>
              </div>
            </li>
            <li onClick={()=>this.setSortNum(3)} className={this.state.sortNum ===3?styles.sort_after:styles.sort_before}>销量</li>
            <li onClick={()=>this.setSortNum(4)} className={this.state.sortNum ===4?styles.sort_after:styles.sort_before}>筛选</li>
          </ul>
        </div>
        {/*商品列表*/}
        <div className={styles.product_categor_wrapper}>
          {product_categor_list.productOfSecondCategory.map((data, index) => {
            return (
              <div key={index} className={styles.product_categor_cont}>
                <div className={styles.product_categor_img}>
                  <img src={data.productImageUrl} alt=""/>
                </div>
                <div className={styles.product_categor_cont_text}>
                  <div className={styles.product_categor_name}>{data.productName}</div>
                  <div className={styles.all_price}>
                    <div className={styles.categor_original_price}>¥0.00</div>
                    <div className={styles.product_categor_price}>¥{data.originalPrice/100}.00</div>
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
