import styles from '../page.css'


const displatText = text=>{
  if(text<10){
    return '0' + text ;
  }
  return text ;
}

export const LotteryBall = ({ball,onClick})=>{
  if(ball === undefined)return (
    <div className={styles.ball} style={{backgroundColor:'#00000000'}}/>
  )

  let opacity = 1 ;
  if(ball.active){
    opacity = 0.3 ;
  }
  if(ball.text.length === 0){
    opacity = 0.3 ;
  }
  return <div onClick={()=>{
    // if(ball.active)return;
    onClick && onClick(ball);
  }} className={styles.ball} style={{backgroundColor:ball.color,opacity:opacity}}>{ball.text}</div>
}
