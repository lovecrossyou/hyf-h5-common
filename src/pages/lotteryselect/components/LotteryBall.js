import styles from '../page.css'

export const LotteryBall = ({ball,onClick})=>{
  if(ball === undefined)return (
    <div className={styles.ball} style={{backgroundColor:'#00000000'}}/>
  )
  return <div onClick={()=>{
    if(ball.active)return;
    onClick && onClick(ball);
  }} className={styles.ball} style={{backgroundColor:ball.color,opacity:ball.active?0.3:1}}>{ball.text}</div>
}
