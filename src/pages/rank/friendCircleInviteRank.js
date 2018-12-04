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
    console.log('onEndReached ');
    this.props.dispatch({
      type:'rank/fetchInviteUserRank',
      payload:{
        type:'friendList',
      },
    })
  }

  componentWillMount(){
    const {friendCircleList, friendCirclePageNo} = this.props.store;

    console.log('friendCircleList ',friendCircleList);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(friendCircleList)
    });
  }


  render(){
    const {friendCircleList,userIconUrl, allRankOfFriendCircle,allRankOfPlatform,inviteAllUserAmount, friendCirclePageNo} = this.props.store;
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#ECECED',
          height: 1,
        }}
      />
    );

    const Row = (rowData, sectionID, rowID)=>{
      return (
        <div className={styles.monthly_focus_section_list_item}>
          <div className={styles.monthly_focus_section_list_tit_left}>
            <div className={styles.monthly_focus_section_list_guan}>
              <RankLabel item={rowData}/>
            </div>
            <div className={styles.monthly_focus_section_list_avatar}>
              <img src={rowData.userIconUrl} alt=""/>
            </div>
            <div className={styles.monthly_focus_section_list_name}>{rowData.userName}</div>
          </div>
          <div className={styles.monthly_focus_section_list_portion}><span>{rowData.friendAmount}</span>人</div>
        </div>
      )
    }

    return <DocumentTitle title='朋友圈排行榜'>
      <div className={styles.container}>
        <ActivityIndicator
          animating={this.props.loading}
        />
        <div>
          <div className={styles.monthly_focus_section_list_item} style={{marginBottom:"20px"}}>
            <div className={styles.monthly_focus_section_list_tit_left}>
              <div>{allRankOfFriendCircle}</div>
              <div className={styles.monthly_focus_section_list_avatar}>
                <img src={userIconUrl} alt=""/>
              </div>
              <div className={styles.monthly_focus_section_list_name}>我</div>
            </div>
            <div className={styles.monthly_focus_section_list_portion}><span>{inviteAllUserAmount}</span>人</div>
          </div>

          <ListView
            ref={el => this.lv = el}
            dataSource={this.state.dataSource}
            style={{
              overflow: 'auto',
              width:document.documentElement.clientWidth,
              height:document.documentElement.clientHeight-210
            }}
            renderRow={Row}
            renderSeparator={separator}
            onScroll={() => { console.log('scroll'); }}
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
    loading: state.loading.global,
  }
})(FriendCircleInviteRank)
