import React from 'react';
import { connect } from 'dva';
import styles from './page.css';
import DocumentTitle from 'react-document-title';
import {ActivityIndicator} from "../../components/ActivityIndicator";
import icon_guan from '../../assets/icon_guan@3x.png';
import icon_ji from '../../assets/icon_ji@3x.png';
import icon_ya from '../../assets/icon_ya@3x.png';
import icon_paihang from '../../assets/icon_paihang@3x.png'
import icon_gengduo from '../../assets/icon_gengduo@3x.png'
import icon_chakan from '../../assets/icon_chakan@3x.png'
import { routerRedux } from 'dva/router';


//名次
export const RankLabel = ({item})=>{
  if(item.rank===1){
    return (
      <div className={styles.monthly_focus_section_list_guan}>
        <img src={icon_guan} alt=""/>
      </div>
    )
  }
  else if(item.rank===2){
    return (
      <div className={styles.monthly_focus_section_list_guan}>
        <img src={icon_ya} alt=""/>
      </div>
    )
  }
  else if(item.rank===3){
    return (
      <div className={styles.monthly_focus_section_list_guan}>
        <img src={icon_ji} alt=""/>
      </div>
    )
  }
  return (
    <div className={styles.monthly_focus_section_list_guan}>
      {item.rank}
    </div>
  )
}


function MonthlyFocus(props) {
  // platformList,
  //   userIconUrl,
  //   allRankOfFriendCircle,
  //   friendCirclePageNo,
  //   allRankOfPlatform,
  //   inviteAllUserAmount
  // friendCircleList
  // isShow

  const {isShow , platformList,userIconUrl, allRankOfFriendCircle,allRankOfPlatform,inviteAllUserAmount, friendCircleList} = props.store;
  // console.log('shifouqiehuanaaaa==',isShow)
  if(platformList.length===0)return null;
  console.log('邀请榜单==',props.store);// 邀请榜单


  // const {platformList,allRankOfFriendCircle , allRankOfPlatform , friendCircleInviteRankUserInfo , userIconUrl , inviteAllUserAmount , platformInviteRankUserInfo} = dateInviteUserRank;
  //
  // // 朋友圈排行
  const InviteUserRankContainer = friendCircleList.map((item,i)=>{
    return(
      <div key={i} className={styles.monthly_focus_section_friends_list_picitem}>
        <img src={item.userIconUrl} alt=""/>
      </div>
    )
  });


  // // 平台排行
  const PlatformInviteRankContainer = platformList.map((item,i)=>{
    return(
      <div className={styles.monthly_focus_section_list_item} key={i}>
        <div className={styles.monthly_focus_section_list_tit_left}>
          <RankLabel item={item}/>
          <div className={styles.monthly_focus_section_list_avatar}>
            <img src={item.userIconUrl} alt=""/>
          </div>
          <div className={styles.monthly_focus_section_list_name}>{item.userName}</div>
        </div>
        <div className={styles.monthly_focus_section_list_portion}><span>{item.friendAmount}</span>份</div>
      </div>
    )
  });
  return <DocumentTitle title='榜单'>
    <div>
      <ActivityIndicator
        color="white"
        toast
        animating={props.loading}
      />
      <div className={styles.monthly_focus_container}>
        <div className={styles.monthly_focus_title}>
          <div className={isShow?styles.bdb6:""} onClick={()=>{
            props.dispatch({
              type:"award/purchaseRank"
            })
          }}>抢购榜单</div>
          <div className={isShow?"":styles.bdb6} onClick={()=>{
            props.dispatch({
              type:"award/inviteUserRank"
            })
          }}>邀请榜单</div>
        </div>
        <div className={styles.monthly_focus_section}>
          <div className={styles.monthly_focus_section_list_tit_box}>
            <div className={styles.monthly_focus_section_list_tit}>
              <div className={styles.monthly_focus_section_friends_list}><img src={icon_paihang} alt=""/><span style={{marginLeft:"10px"}}>好友排行</span></div>
              <div className={styles.monthly_focus_section_friends_list_num}>
                <span>我</span>
                <span className={styles.monthly_focus_section_friends_list_num_bbig}>{allRankOfFriendCircle}</span>
                <span className={styles.monthly_focus_section_friends_list_num_big}>名</span>
              </div>
              <div className={styles.monthly_focus_section_friends_list_pic}>
                {InviteUserRankContainer}
              </div>
              <div className={styles.monthly_focus_section_friends_list_all}
                  onClick={()=>{
                    props.dispatch(routerRedux.push('/rank/friendCircleInviteRank'));
                  }}
              >全部好友排行 <img src={icon_chakan} alt=""/></div>
            </div>
          </div>
          <div className={styles.monthly_focus_section_list}>
            <div className={styles.monthly_focus_section_list_item}>
              <div className={styles.monthly_focus_section_list_tit_left}>
                <div>{allRankOfPlatform}</div>
                <div className={styles.monthly_focus_section_list_avatar}>
                  <img src={userIconUrl} alt=""/>
                </div>
                <div className={styles.monthly_focus_section_list_name}>我</div>
              </div>
              <div className={styles.monthly_focus_section_list_portion}><span>{inviteAllUserAmount}</span>人</div>
            </div>
            {PlatformInviteRankContainer}
          </div>
        </div>
      </div>
    </div>
  </DocumentTitle>
}

export default connect(state=>{
  return {
    store: state.rank,
    loading:state.loading.global
  }
})(MonthlyFocus)
