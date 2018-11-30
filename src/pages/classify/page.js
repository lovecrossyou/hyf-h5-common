import React, { Component } from 'react';
import styles from './page.css'

class Dashboardanalysiscomponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      needIndex:0,
      list: [
        { nav: "热门",
          content:{
            img:"11",
            title:"电视"
          }
        },
        { nav: "充值",
          content: {
            img:"22",
            title:"空调"
          }
        },
        { nav: "手机",
          content: {
            img:"33",
            title:"洗衣机"
          }
        },
        { nav: "数码",
          content: {
            img:"44",
            title:"家纺"
          }
        },
        { nav: "家电",
          content: {
            img:"55",
            title:"茶具"
          }
        },
        { nav: "汽车",
          content: {
            img:"66",
            title:"零食"
          }
        },
        { nav: "居家",
          content: {
            img:"77",
            title:"独角兽"
          }
        },
        { nav: "食品",
          content: {
            img:"88",
            title:"独角兽"
          }
        },
        { nav: "洗护",
          content: {
            img:"99",
            title:"魔法"
          }
        },
        { nav: "箱包",
          content: {
            img:"1010",
            title:"可爱"
          }
        }
      ]
    };
  }
  componentDidMount () {
    console.log(this.state)
  }
  handleClick(val){
    this.setState({
      needIndex:val
    })
  }

  render() {
    return (
      <div className={styles.warpper}>
        <ul>
          <li className={styles.classify_list}>
            {this.state.list.map((data,index) => {
                return (
                  <span key={index} onClick={this.handleClick.bind(this,index)} className={this.state.needIndex==index?styles.onclick_after:styles.onclick_before}>{data.nav}</span>
                )
              })
            }
          </li>
          <li className={styles.classify_content_wrap}>
            {this.state.list.map((data,index) =>{
              return (
                <div key={index} style={{display:this.state.needIndex==index?"block":"none"}} className={styles.classify_shop}>
                  <div className={styles.classify_shop_img}>
                    <img src={data.content.img} alt=""/>
                  </div>
                  <p className={styles.classify_shop_name}>{data.content.title}</p>
                </div>
              )
            })
          }
          </li>
        </ul>
      </div>
    );
  }
}

export default Dashboardanalysiscomponent;
