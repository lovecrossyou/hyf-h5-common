import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './classify_detail.css';


class ClasifyDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      needIndex:0,
      list: [
        { id: "综合", title: '前端人人1' },
        { id: "价格", title: '前端人人2' },
        { id: "销量", title: '前端人人3' },
        { id: "筛选", title: '前端人人4' },
      ]
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
    return (
      <div>
        <ul>
          <li className={styles.top_nav}>
            {
              this.state.list.map((data, index) => {
                return (
                  <div key={index} onClick={this.newslistclick.bind(this, index)} className={this.state.needIndex==index?styles.onclick_after:styles.onclick_before}>{data.id}</div>
                )
              })
            }
          </li>
          <li className={styles.classify_detail_shop}>
            {
              this.state.list.map((data, index) => {
                return (
                  <div key={index} style={{ display: this.state.needIndex == index ? "block" : "none" }}>{data.title}</div>
                )
              })
            }
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(state=>{
  return {
    store:state.classify
  }
})(ClasifyDetail)
