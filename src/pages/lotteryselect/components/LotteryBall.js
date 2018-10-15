import styles from '../page.css'

export const LotteryBall = ({code,size='85px'})=>{
  if(code === undefined)return null;
  return <div className={styles.ball} style={{width:size,height:size,backgroundColor:code.color}}>{code.text}</div>
}
