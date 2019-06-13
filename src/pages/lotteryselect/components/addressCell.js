import React from 'react';
import { SwipeAction, List, Icon } from 'antd-mobile';
import styles from './address.css';
import chooseIcon from '../../../assets/address/choose@2x.png';
import editIcon from '../../../assets/address/adress_btn_edit@2x.png';
import delIcon from '../../../assets/address/adress_btn_delete@2x.png';

export const AddressCell = ({ address, toggle, active }) => {
  console.log('address ', address);
  return <div className={styles.address}>
    <div>
      <div
        onClick={toggle}
      >
        <div className={styles['cell-content']}>
          <div className={styles.right}>
            <div className={styles.linkman}>
              <div className={styles.reciev_name}>{address.recievName}</div>
              <div>{address.phoneNum}</div>
            </div>
            <div className={styles.shipping_address}>
              <div>{address.districtAddress}</div>
            </div>
          </div>
          <div className={styles.address_operate}>
            {active ? (<Icon type='check'/>) : null}
          </div>
        </div>
      </div>
    </div>
  </div>;
};
