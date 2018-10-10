import React from 'react';
import {connect} from 'dva';
import styles from './page.css'
import diamondsImgIcon from '../../assets/icon_diamonds-vip@2x.png';
import godImgIcon from '../../assets/icon_goldvip@2x.png';
import platinumImgIcon from '../../assets/icon_Platinum-vip@2x.png'
const vips = [{title:"黄金会员",img:godImgIcon,desc:"meijizengsong1",price:"19.8",id:"1"},{title:"黄11111",img:platinumImgIcon,desc:"meijizengsong1",price:"19.8"},{title:"黄金会员",img:diamondsImgIcon,desc:"meijizengsong1",price:"19.8"}]
class Member extends React.Component {
  buyNow=(vip)=>{
    return ()=>{
      console.log(vip.title);
      // post(vip.id).then((info)=>{
      //   pay(info)
      // })
    }
  };
  render() {
    return <div>
      <div className={styles.header_bg}>
        <div className={styles.title}>
          <div className={styles.title_bg}>普通会员</div>
          <div>您当前是普通会员，仅可每月参与1次0元抢金砖活动</div>
        </div>
      </div>
      <div className={styles.tips}>
        <div>会员专享特权</div>
        <div>会员专享特权</div>
      </div>
      <div className={styles.vip}>
        <div className={styles.vip_title}>会员等级特权</div>
        <div className={styles.vip_list}>
          {vips.map((vip,index)=>{
            return(
              <VipItem key={index} vip={vip} action={this.buyNow(vip)} />
            )
          })}
        </div>
      </div>
      <Tips />
    </div>
  }

}
const VipItem = ({vip,action})=>{
    return (
      <div className={styles.vip_item}>
        <div className={styles.vip_item_content}>
          <div className={styles.vip_left}>
            <img src={vip.img} alt="" className={styles.vip_left_img}/>
            <div className={styles.vip_left_text}>
              <div className={styles.vip_left_text_title}>{vip.title}</div>
              <div className={styles.vip_left_text_desc}>{vip.desc}</div>
              <div className={styles.vip_left_text_price}>{vip.price}元/年</div>
            </div>
          </div>
          <div className={styles.vip_right}>
            <div className={styles.vip_right_action} onClick={action}>立即购买</div>
          </div>
        </div>
      </div>
    )
};
const Tips = ()=>{
  return(
    <div className={styles.answer}>
      <div className={styles.answer_title}>疑问小解答</div>
      <div className={styles.answer_content}>
        <div className={styles.answer_title_text}>细笔可以干什么？</div>
        <div>细笔可以干什么？</div>
      </div>
    </div>
  )
};

export default connect(({shoppingcart}) => ({
  store: shoppingcart
}))(Member);

