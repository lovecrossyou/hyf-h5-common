import React from 'react';
import { SwipeAction, List,Icon } from 'antd-mobile';
import styles from './address.css';
import chooseIcon from '../../../assets/address/choose@2x.png';
import editIcon from '../../../assets/address/adress_btn_edit@2x.png';
import delIcon from '../../../assets/address/adress_btn_delete@2x.png';

export const AddressCell = ({address,del,edit,onClick,backType=null})=>{

  console.log('address ',address)
  return <div   style={{margin:'10px 0',backgroundColor:'#fff'}}>
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
            style: { backgroundColor: '#ddd', color: 'white',width:'140px' },
          },
          {
            text: '编辑',
            onPress: () => {
              edit(address);
            },
            style: { backgroundColor: '#F4333C', color: 'white',width:'140px' },
          },
        ]}
        onOpen={() => console.log('global open')}
        onClose={() => console.log('global close')}
      >
        <List.Item
          onClick={e => console.log(e)}
        >
          <div className={backType==='native'? 'addr_btn' : 'addr_btn' } data={address.id} onClick={onClick}>
            <div className={styles.right}>
              <div className={styles.linkman}>
                <div className={styles.reciev_name}>{address.recievName}</div>
                <div>{address.phoneNum}</div>
              </div>
              <div className={styles.shipping_address}>
                <div>{address.fullAddress}</div>
              </div>
              <div className={styles.address_operate}>
                {/*<span>*/}
                  {/*<img src={chooseIcon} alt="" style={{width:'36px',height:'36px',margin:'-10px 10px 0 0'}}/>*/}
                  {/*默认地址*/}
                {/*</span>*/}
                {/*<span className={styles.handle}>*/}
                  {/*<s*/}
                    {/*onClick={(e)=>{*/}
                      {/*e.stopPropagation();*/}
                      {/*edit(address);*/}
                    {/*}}>*/}
                    {/*<img src={editIcon} alt="" style={{width:'34px',height:'34px',margin:'-10px 10px 0 0'}}/>*/}
                    {/*编辑*/}
                  {/*</s>*/}
                  {/*<s*/}
                    {/*onClick={(e)=>{*/}
                      {/*e.stopPropagation();*/}
                      {/*del(address);*/}
                    {/*}}>*/}
                    {/*<img src={delIcon} alt="" style={{width:'34px',height:'34px',margin:'-10px 10px 0 0'}}/>*/}
                    {/*删除*/}
                  {/*</s>*/}
                {/*</span>*/}
              </div>
            </div>
          </div>
        </List.Item>
      </SwipeAction>
    </List>
  </div>
}
