import styles from '../page.css'

export const LotteryBall = ({text,size='60px'})=>{
  return <div className={styles.ball} style={{width:size,height:size}}>{text}</div>
}
