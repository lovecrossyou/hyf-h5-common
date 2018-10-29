import React from 'react';
import { connect } from 'dva';
import styles from './page.css';
import DocumentTitle from 'react-document-title';
import { routerRedux } from 'dva/router';

import icon_bg_baiyang from '../../assets/astro/icon_bg_baiyang@2x.png';
import icon_bg_chunv from '../../assets/astro/icon_bg_chunv@2x.png';
import icon_bg_tianxie from '../../assets/astro/icon_bg_tianxie@2x.png';
import icon_bg_jinniu from '../../assets/astro/icon_bg_jinniu@2x.png';
import icon_bg_sheshou from '../../assets/astro/icon_bg_sheshou@2x.png';
import icon_bg_shuangyu from '../../assets/astro/icon_bg_shuangyu@2x.png';
import icon_bg_shuangzi from '../../assets/astro/icon_bg_shuangzi@2x.png';
import icon_bg_juxie from '../../assets/astro/icon_bg_juxie@2x.png';
import icon_bg_shizi from '../../assets/astro/icon_bg_shizi@2x.png';
import icon_bg_tianping from '../../assets/astro/icon_bg_tianping@2x.png';
import icon_bg_mojie from '../../assets/astro/icon_bg_mojie@2x.png';
import icon_bg_shuiping from '../../assets/astro/icon_bg_shuiping@2x.png';
import icon_bg_cuowu from '../../assets/astro/icon_bg_cuowu@2x.png';

const astrologys = [
  { name: 'Aries', cName: '白羊座', img: icon_bg_baiyang },
  { name: 'Taurus', cName: '金牛座', img: icon_bg_jinniu },
  { name: 'Gemini', cName: '双子座', img: icon_bg_shuangzi },
  { name: 'Cancer', cName: '巨蟹座', img: icon_bg_juxie },
  { name: 'Leo', cName: '狮子座', img: icon_bg_shizi },
  { name: 'Virgo', cName: '处女座', img: icon_bg_chunv },
  { name: 'Libra', cName: '天秤座', img: icon_bg_tianping },
  { name: 'Scorpio', cName: '天蝎座', img: icon_bg_tianxie },
  { name: 'Sagittarius', cName: '射手座', img: icon_bg_sheshou },
  { name: 'Capricorn', cName: '摩羯座', img: icon_bg_mojie },
  { name: 'Aquarius', cName: '水瓶座', img: icon_bg_shuiping },
  { name: 'Pisces', cName: '双鱼座', img: icon_bg_shuangyu },
];

function AstroItem(props) {
  const store = props.store;
  let astrologyItem = astrologys.map((item, i) => {
    return (
      <div onClick={() => {
        props.dispatch({
          type: 'astro/saveAstro',
          payload: item,
        });
        props.dispatch(routerRedux.push('/astro/ImprovePersonalData'));

      }} key={i} className={styles.astroItem_astrology_name_item}>
        <img src={item.img} alt=""/>
      </div>
    );
  });
  return (
    <DocumentTitle title='星座选择'>
      <div className={styles.astroItem}>
        <div className={styles.astroItem_choose_astrology}>选择星座</div>
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
