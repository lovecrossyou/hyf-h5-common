import React from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import { TextareaItem,Button } from 'antd-mobile';

import styles from './page.css' ;

const tips = '猪年大吉，金猪送福，一起来抽签抢金条吧！完全免费，祝你好运！';

class QrCode extends React.Component {

  state = {
    tips:tips
  }


  onChange = text=>{
    this.props.dispatch({
      type:'personInfo/saveShareTips',
      payload:text
    });

    this.setState({
      tips:text
    })
  }

  render(){
    const { qrData,userInfo } = this.props.personInfo;
    return <DocumentTitle title='我的二维码'>
      <div className={styles.qrcode}>
        <div className={styles.content}>
          <div className={styles.flex_r}>
            <img className={styles.avatar} src={userInfo.userInfo.icon} alt=''/>
            <div className={styles.info}>
              <div className={styles.name}>{userInfo.userInfo.cnName}</div>
              <div className={styles.xt_number}>喜腾号：{userInfo.userInfo.xtNumber}</div>
            </div>
          </div>
          <div className={styles.img_border}>
            <img className={styles.qr_img} src={qrData} alt=''></img>
          </div>
          <div className={styles.footer}>
            <TextareaItem
              className={styles['am-textarea-control']}
              rows={3}
              editable
              value={this.state.tips}
              onChange={this.onChange.bind(this)}
            />
          </div>
          <div className='btn_qrcode_share'>
            <Button className={styles.btn_qrcode_share_btn}>分享</Button>
          </div>
        </div>
      </div>
    </DocumentTitle>;
  }
}

export default connect(state => {
  return {
    personInfo: state.personInfo,
  };
})(QrCode);

