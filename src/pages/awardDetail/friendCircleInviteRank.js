import React from 'react';
import { connect } from 'dva';
import styles from './page.css';
import DocumentTitle from 'react-document-title';
import {ActivityIndicator } from "../../components/ActivityIndicator";
import icon_guan from '../../assets/icon_guan@3x.png';
import icon_ji from '../../assets/icon_ji@3x.png';
import icon_ya from '../../assets/icon_ya@3x.png';
import { ListView } from 'antd-mobile';


class FriendCircleInviteRank extends React.Component{

  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataSource,
    };
  }

  componentWillMount(){
    this.fetchData();
  }


  // 加载数据
  fetchData = ()=>{
    this.props.dispatch({
      type:'award/fetchInviteUserRank',
      payload:{
        type:'friendList'
      },
      cb:()=>{
        const list = this.props.store.friendCircleList ;


        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(list),
        });

        console.log('list  dataSource ',this.state.dataSource);

      }
    })
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
      return (<div></div>);
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
    }



    const friendCircleInviteRankRank = friendCircleList.map((item,i)=>{
      if(i<=2) return null;
      return(
        <div className={styles.monthly_focus_section_list_item} key={i}>
          <div className={styles.monthly_focus_section_list_tit_left}>
            <div className={styles.monthly_focus_section_list_guan}>
              {item.rank}
            </div>
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
          <div className={styles.monthly_focus_section_list_item} style={{marginTop:"24px"}}>
            <div className={styles.monthly_focus_section_list_tit_left}>
              <div className={styles.monthly_focus_section_list_guan}>
                <img src={icon_guan} alt=""/>
              </div>
              <div className={styles.monthly_focus_section_list_avatar}>
                <img src={friendCircleList[0].userIconUrl} alt=""/>
              </div>
              <div className={styles.monthly_focus_section_list_name}>{friendCircleList[0].userName}</div>
            </div>
            <div className={styles.monthly_focus_section_list_portion}><span>{friendCircleList[0].friendAmount}</span>份</div>
          </div>
          <div className={styles.monthly_focus_section_list_item}>
            <div className={styles.monthly_focus_section_list_tit_left}>
              <div className={styles.monthly_focus_section_list_guan}>
                <img src={icon_ya} alt=""/>
              </div>
              <div className={styles.monthly_focus_section_list_avatar}>
                <img src={friendCircleList[1].userIconUrl} alt=""/>
              </div>
              <div className={styles.monthly_focus_section_list_name}>{friendCircleList[1].userName}</div>
            </div>
            <div className={styles.monthly_focus_section_list_portion}><span>{friendCircleList[1].friendAmount}</span>份</div>
          </div>
          <div className={styles.monthly_focus_section_list_item}>
            <div className={styles.monthly_focus_section_list_tit_left}>
              <div className={styles.monthly_focus_section_list_guan}>
                <img src={icon_ji} alt=""/>
              </div>
              <div className={styles.monthly_focus_section_list_avatar}>
                <img src={friendCircleList[2].userIconUrl} alt=""/>
              </div>
              <div className={styles.monthly_focus_section_list_name}>{friendCircleList[2].userName}</div>
            </div>
            <div className={styles.monthly_focus_section_list_portion}><span>{friendCircleList[2].friendAmount}</span>份</div>
          </div>
          {/*{friendCircleInviteRankRank}*/}

          <ListView
            ref={el => this.lv = el}
            dataSource={this.state.dataSource}
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
    store: state.award,
    loading:state.loading.global
  }
})(FriendCircleInviteRank)