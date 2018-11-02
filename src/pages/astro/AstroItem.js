import React from 'react';
import { connect } from 'dva';
import styles from './page.css';
import DocumentTitle from 'react-document-title';
import { routerRedux } from 'dva/router';
import icon_bg_cuowu from '../../assets/astro/icon_bg_cuowu@2x.png';
import astroData from '../../utils/astroData'


function AstroItem(props) {
  const store = props.store;
  let astrologyItem = astroData.astrologys.map((item, i) => {
    return (
      <div onClick={() => {
        props.dispatch({
          type: 'astro/constellation',
          payload: {
            constellation: item.name,
          },
          cb:()=>{
            props.dispatch(routerRedux.goBack());
          }
        });


      }} key={i} className={styles.astroItem_astrology_name_item}>
        <img src={item.img} alt=""/>
      </div>
    );
  });
  return (
    <DocumentTitle title='星座选择'>
      <div className={styles.astroItem}>
        <div className={styles.astroItem_astrology_name}>
          {astrologyItem}
        </div>
        <div className={styles.astroItem_icon_bg_cuowu}>
          <img src={icon_bg_cuowu} alt=""/>
        </div>
      </div>
    </DocumentTitle>

  );
}

export default connect(state => {
  return {
    store: state.astro,
  };
})(AstroItem);
