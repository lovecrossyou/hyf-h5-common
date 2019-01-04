import React from 'react';
import { connect } from 'dva';
import { Modal, Button, Radio } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import styles from './page.css';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import crown_icon from '../../assets/vip/crown_icon.png';
import putong_icon from '../../assets/vip/putong_icon@2x.png';
import DocumentTitle from 'react-document-title';
import  VIPMember from './components/vipmember'


const VIPName = userVipInfo=>{
  if(userVipInfo.userVipType === 'golden_user'){
    return '黄金会员'
  }
  else if(userVipInfo.userVipType === 'higher_golden_user'){
    return '铂金会员'
  }
  else if(userVipInfo.userVipType === 'diamond_user'){
    return '钻石会员'
  }
  return '普通会员'
};

const stakeNumber = userVipInfo=>{
  if(userVipInfo.userVipType === 'golden_user'){
    return '赠送抽签抢黄金一年，每期1注'
  }
  else if(userVipInfo.userVipType === 'higher_golden_user'){
    return '赠送抽签抢黄金一年，每期2注'
  }
  else if(userVipInfo.userVipType === 'diamond_user'){
    return '赠送抽签抢黄金一年，每期10注'
  }
  return ''
};

const VIPHeader = ({userVipInfo})=>{
const {userVipGrade} = userVipInfo ;

console.log('userVipInfo ',userVipInfo);
const DiamondStar = [] ;
for (let i = 0; i<userVipGrade;i++){
  DiamondStar.push(
    <img src={crown_icon} alt="" className={styles.star_img} key={i + '#'}/>,
  )
}

//头部会员详情
  return <div className={styles.flex_row}>
    <div className={styles.diamond_wrapper}>
      <div className={styles.member_grade_show}>
        <div className={styles.member_yellow}>&nbsp;{VIPName(userVipInfo)}</div>
        <div className={styles.member_diamond}>{DiamondStar}</div>
      </div>
      <div className={styles.member_give}>&nbsp;{stakeNumber(userVipInfo)}</div>
      <div className={styles.end_time}>{userVipInfo.vipEndTime}</div>
    </div>
  </div>
};

const BtnBuy = ()=>{
  return <div className={styles.btn_buy}>
    立即购买
  </div>
};
const ProductItem = ({data,onClick})=>{
  return <div
    className={styles.product}
    onClick={onClick}>
    <img src={data.imageUrl} className={styles.p_img} alt=""/>
    <div className={styles.p_info}>
      <div className={styles.p_info_title}>{data.productName}</div>
      <div className={styles.p_info_desc}>{data.subtitle}</div>
      <div className={styles.btn_buy_wrapper}>
        <div className={styles.p_info_price}>￥{data.price/100}</div>
        <BtnBuy/>
      </div>
    </div>
  </div>
};


class Member extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      checkedIndex: 0,
    };
  }


  render() {
    const { userVipInfo,products } = this.props.store;
    const { loading } = this.props;
    if (userVipInfo == null) return (
      <ActivityIndicator
        color="white"
        toast
        animating={loading}
      />
    );
    return (
      <DocumentTitle title='会员商店'>
        <div style={{ paddingBottom: '40px' }}>
          <div className={styles.header_bg}>
            <VIPHeader userVipInfo={userVipInfo}/>
          </div>
          <div className={styles.tips}>
            <div className={styles.tips_title}>会员专享特权</div>
            <div className={styles.tips_desc}>普通用户每周免费参与一期抽签抢黄金，获赠1注抽签。                 购买会员或专供商品享受每期（周二、四、日22:00揭晓中签）参与抽签抢黄金。。</div>

          </div>
          <VIPMember/>
          <div className={styles.vip}>
            <div className={styles.vip_title}>会员专供</div>
            <div className={styles.vip_list}>
              {
                products.map((p,index)=>{
                  return <ProductItem
                    key={index+'#'}
                    data={p}
                    onClick={()=>{
                      console.log('vipProductId ',p);
                      this.props.dispatch({
                        type:'member/setActiveProduct',
                        payload:p
                      });
                      this.props.dispatch(routerRedux.push('/member/productDetailsContainer?id='+p.vipProductId))
                    }}/>
                })
              }
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}


export default connect(state => ({
  store: state.member,
  loading: state.loading.global,
}))(Member);

