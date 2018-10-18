import React from 'react';
import { SwipeAction, List,Icon } from 'antd-mobile';
import styles from './address.css'

export const AddressCell = ({address,del,edit})=>{
  return <div style={{margin:'10px 0',backgroundColor:'#fff'}}>
    <List>
      <SwipeAction
        style={{ backgroundColor: '#f5f5f5' }}
        autoClose
        right={[
          {
            text: '删除',
            onPress: () => {
              del(address);
            },
            style: { backgroundColor: '#ddd', color: 'white',width:'70px' },
          },
          {
            text: '编辑',
            onPress: () => {
              edit(address);
            },
            style: { backgroundColor: '#F4333C', color: 'white',width:'70px' },
          },
        ]}
        onOpen={() => console.log('global open')}
        onClose={() => console.log('global close')}
      >
        <List.Item
          onClick={e => console.log(e)}
        >
          <div className={styles["cell-content"]}>
            <div className={styles["left-icon"]}>
              <Icon type='search'/>
            </div>
            <div className={styles.right}>
              <div className={styles["flex-r"]}>
                <div>{address.userName}</div>
                <div>{address.phoneNum}</div>
              </div>
              <div className={styles["flex-r"]}>
                <div>{address.address}</div>
              </div>
            </div>
          </div>
        </List.Item>
      </SwipeAction>
    </List>
  </div>
}
