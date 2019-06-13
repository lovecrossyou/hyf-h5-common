import React from 'react'
import { connect } from 'dva';
import { createForm } from 'rc-form';

import { ImagePicker, WingBlank, TextareaItem,List,Button } from 'antd-mobile';

import styles from './page.css'

const data = [];

class ShareInfo extends React.Component {
  state = {
    files: data,
    multiple: false,
  }
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }
  onSegChange = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex;
    this.setState({
      multiple: index === 1,
    });
  }

  render() {
    const { files } = this.state;
    const { getFieldProps } = this.props.form;

    return (
      <WingBlank>
        <div className={styles.content}>小程序分享图片以及内容设置</div>

        <List renderHeader={() => '分享图片'}>
          <ImagePicker
            files={files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length <= 1}
            multiple={this.state.multiple}
          />
        </List>

        <List renderHeader={() => '分享内容[主标题]'}>
          <TextareaItem
            {...getFieldProps('count', {
              // initialValue: '分享内容',
            })}
            placeholder='猪年大吉，金猪送福，免费抽签，立即领取！'
            rows={5}
            count={100}
          />
        </List>

        <List renderHeader={() => '分享内容【副标题】'}>
          <TextareaItem
            {...getFieldProps('count', {
              // initialValue: '分享内容',
            })}
            placeholder='新年运势来袭，黄金属于你！长按识别小程序，立即加入抢购'
            rows={5}
            count={100}
          />
        </List>


        <div className={styles.btn_send}>
          <Button type="primary" >发布</Button>
        </div>
      </WingBlank>
    );
  }
}
const ShareInfoWrapper = createForm()(ShareInfo);

export default connect()(ShareInfoWrapper);
