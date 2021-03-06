import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';

import styles from './page.css'

class Classify extends Component {

  handleClick(categoryIndex){
    //请求二级分类
    const {first_category_list,second_category_list} = this.props.store ;
    const selectCategory = first_category_list[categoryIndex];
    console.log('categoryIndex ',selectCategory);

    this.props.dispatch({
      type:'classify/secondCategory',
      payload:{
        firstCategoryId:selectCategory.firstCategoryId
      }
    });
    //发送action
    this.props.dispatch({
      type:'classify/setIndex',
      payload: categoryIndex
    });

  }

  render() {
    const {first_category_list,second_category_list,needIndex} = this.props.store ;
    return (
      <DocumentTitle title='分类'>
        <div className={styles.warpper}>
          <ul>
            <li className={styles.classify_list}>
              {first_category_list.map((data,index) => {
                return (
                  <span key={index+'#'} onClick={this.handleClick.bind(this,index)} className={needIndex===index?styles.onclick_after:styles.onclick_before}>{data.firstCategoryName}</span>
                )
              })
              }
            </li>
            <li className={styles.classify_content_wrap}>
              {second_category_list.map((data,index) =>{
                return (
                  <div
                    onClick={()=>{
                      const {secondCategoryId} = data ;
                      console.log('data ',data);
                      this.props.dispatch(routerRedux.push('./classify_detail?categoryId='+secondCategoryId))
                    }}
                    key={index}
                    className={styles.classify_shop}>
                    <div className={styles.classify_shop_img}>
                      <img src={data.secondCategoryImageUrl} alt=""/>
                    </div>
                    <p className={styles.classify_shop_name}>{data.secondCategoryName}</p>
                  </div>
                )
              })
              }
            </li>
          </ul>
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(state=>{
  return {
    store:state.classify
  }
})(Classify)
