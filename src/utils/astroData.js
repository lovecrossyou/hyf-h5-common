import icon_bg_baiyang from '../assets/astro/icon_bg_baiyang@3x.png';
import icon_bg_chunv from '../assets/astro/icon_bg_chunv@3x.png';
import icon_bg_tianxie from '../assets/astro/icon_bg_tianxie@3x.png';
import icon_bg_jinniu from '../assets/astro/icon_bg_jinniu@3x.png';
import icon_bg_sheshou from '../assets/astro/icon_bg_sheshou@3x.png';
import icon_bg_shuangyu from '../assets/astro/icon_bg_shuangyu@3x.png';
import icon_bg_shuangzi from '../assets/astro/icon_bg_shuangzi@3x.png';
import icon_bg_juxie from '../assets/astro/icon_bg_juxie@3x.png';
import icon_bg_shizi from '../assets/astro/icon_bg_shizi@3x.png';
import icon_bg_tianping from '../assets/astro/icon_bg_tianping@3x.png';
import icon_bg_mojie from '../assets/astro/icon_bg_mojie@3x.png';
import icon_bg_shuiping from '../assets/astro/icon_bg_shuiping@3x.png';

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

const astroName = name=>{
  for(let astro of astrologys){
    if(astro.name === name)return astro.cName ;
  }
  return ''
}


module.exports = {
  astrologys:astrologys,
  astroName:astroName
}
