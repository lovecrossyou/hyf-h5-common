import styles from '../page.css';
import cheng_icon from '../../../assets/lottery/icon_haoma_cheng@2x.png'
import jia from '../../../assets/lottery/icon_haoma_jia@2x.png'
import jian from '../../../assets/lottery/icon_haoma_jia_h@2x.png'

export const Stepper = ({ onChange, min, max, value }) => {
  return <div className={styles.stepper}>
    <div
      onClick={() => {
        if(value<=min)return;
        onChange(--value);
      }}
      className={styles.minus}>-</div>
    <div className={styles.stepper_value}>{value}</div>
    <div onClick={() => {
      if(value>=max)return;
      onChange(++value);
    }}
         className={styles.plus}>+</div>
  </div>;
};
