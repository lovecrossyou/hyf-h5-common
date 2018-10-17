import React from 'react';
import Link from 'umi/link';
import {connect} from 'dva';
import styles from './page.css'
import { Flex , WhiteSpace } from 'antd-mobile'

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
  {img:icon_bg_baiyang},
  {img:icon_bg_jinniu},
  {img:icon_bg_shuangzi},
  {img:icon_bg_juxie},
  {img:icon_bg_shizi},
  {img:icon_bg_chunv},
  {img:icon_bg_tianping},
  {img:icon_bg_tianxie},
  {img:icon_bg_sheshou},
  {img:icon_bg_mojie},
  {img:icon_bg_shuiping},
  {img:icon_bg_shuangyu}
];

// export const AstroItem = ({astro})=>{
//   const {icon,title,desc,time} = astro ;
//   return <div>
//     <div className="aa">xx</div>
//   </div>
// };

function AstroItem(props) {
  const store = props.store ;
  let astrologyItem = astrologys.map((item,i)=>{
    return(
      <div onClick={()=>{
        props.dispatch({
          type:'astro/saveAstro',
          payload:item,
        })
      }} key={i} className={styles.astroItem_astrology_name_item}>
        {/*<img src={item.img} onClick={} alt=""/>*/}
        <Link to="./Horoscope">
          <img src={item.img} alt=""/>
        </Link>
      </div>
    )
  });
  return (
    <div className={styles.astroItem}>
      <div className={styles.astroItem_choose_astrology}>选择星座</div>
      <div className={styles.astroItem_astrology_name}>
        {astrologyItem}
      </div>
      <div className={styles.astroItem_icon_bg_cuowu} >
        <img src={icon_bg_cuowu} alt=""/>
      </div>
    </div>
  );
}

export default connect(state => {
  return {
    store: state.astro
  };
})(AstroItem);
