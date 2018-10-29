import styles from '../page.css';
import jia from '../../../assets/lottery/icon_haoma_jia@2x.png';
import yinjia from '../../../assets/lottery/icon_haoma_jia_h@2x.png';
import jian from '../../../assets/lottery/icon_haoma_jian@2x.png';
import yinjian from '../../../assets/lottery/icon_haoma_jian_h@2x.png';

const OptionCom = ({enable,onChange,left=true})=>{
 const minusIcon_active = jian ;
 const minusIcon = yinjian ;
 const plusIcon_active = jia ;
 const plusIcon = yinjia ;
 if(left){
  return <div onClick={onChange} className={styles.minus_btn}>
    <img src={enable?minusIcon_active:minusIcon} alt=""/>
  </div>
 }
  return <div onClick={onChange} className={styles.plus_btn}>
    <img src={enable?plusIcon_active:plusIcon} alt=""/>
  </div>
};

export const Stepper = ({ onChange, min=1, max=3, value }) => {
  return <div className={styles.stepper}>
    <OptionCom
      onChange={()=>{
        if(value<=min)return;
        onChange(--value);
      }}
      enable={value>min}
      left={true}/>

    <div className={styles.stepper_value}>{value}</div>

    <OptionCom
      onChange={()=>{
        if(value>=max)return;
        onChange(++value);
      }}
      enable={value<max}
      left={false}/>
  </div>;
};
