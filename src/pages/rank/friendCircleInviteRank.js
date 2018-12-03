import React from 'react';
import { connect } from 'dva';
import styles from './page.css';
import DocumentTitle from 'react-document-title';
import {ActivityIndicator } from "../../components/ActivityIndicator";
import icon_guan from '../../assets/icon_guan@3x.png';
import icon_ji from '../../assets/icon_ji@3x.png';
import icon_ya from '../../assets/icon_ya@3x.png';
import { ListView } from 'antd-mobile';
import { RankLabel } from './page';


function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}


class FriendCircleInviteRank extends React.Component{

  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
    };
  }


  onEndReached=()=>{

  }


  render(){
    const {friendCircleList,userIconUrl, allRankOfFriendCircle,allRankOfPlatform,inviteAllUserAmount, friendCirclePageNo} = this.props.store;
    if(friendCircleList.length == 0)return null ;

    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );

    const Row = (rowData, sectionID, rowID)=>{
      console.log('rowData ',rowData);
      return (
        <div className={styles.monthly_focus_section_list_item}>
          <div className={styles.monthly_focus_section_list_tit_left}>
            <div className={styles.monthly_focus_section_list_guan}>
              {rowData.rank}
            </div>
            <div className={styles.monthly_focus_section_list_avatar}>
              <img src={rowData.userIconUrl} alt=""/>
            </div>
            <div className={styles.monthly_focus_section_list_name}>{rowData.userName}</div>
          </div>
          <div className={styles.monthly_focus_section_list_portion}><span>{rowData.friendAmount}</span>份</div>
        </div>
      )
    }


    const friendCircleInviteRankRank = friendCircleList.map((item,i)=>{
      return(
        <div className={styles.monthly_focus_section_list_item} key={i}>
          <div className={styles.monthly_focus_section_list_tit_left}>
            <RankLabel item={item} />
            <div className={styles.monthly_focus_section_list_avatar}>
              <img src={item.userIconUrl} alt=""/>
            </div>
            <div className={styles.monthly_focus_section_list_name}>{item.userName}</div>
          </div>
          <div className={styles.monthly_focus_section_list_portion}><span>{item.friendAmount}</span>份</div>
        </div>
      )
    });
    return <DocumentTitle title='朋友圈排行榜'>
      <div>
        <ActivityIndicator
          color="white"
          toast
          animating={this.props.loading}
        />
        <div>
          <div className={styles.monthly_focus_section_list_item} style={{marginBottom:"20px"}}>
            <div className={styles.monthly_focus_section_list_tit_left}>
              <div>{allRankOfPlatform}</div>
              <div className={styles.monthly_focus_section_list_avatar}>
                <img src={userIconUrl} alt=""/>
              </div>
              <div className={styles.monthly_focus_section_list_name}>我</div>
            </div>
            <div className={styles.monthly_focus_section_list_portion}><span>{inviteAllUserAmount}</span>人</div>
          </div>

          {friendCircleInviteRankRank}

          <ListView
            ref={el => this.lv = el}
            dataSource={this.state.dataSource}
            style={{
              height: '1900px',
              overflow: 'auto',
            }}
            renderRow={Row}
            renderSeparator={separator}
            pageSize={8}
            onScroll={() => { console.log('scroll'); }}
            scrollRenderAheadDistance={500}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={10}
          />
        </div>
      </div>
    </DocumentTitle>
  }
}

export default connect(state=>{
  return {
    store: state.rank,
    loading:state.loading.global
  }
})(FriendCircleInviteRank)
