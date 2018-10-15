import styles from '../page.css'

export const LotteryBall = ({code,size='85px'})=>{
  console.log(code);
  return <div className={styles.ball} style={{width:size,height:size}}>{code.text}</div>
}
