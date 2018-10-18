import styles from '../page.css';

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
