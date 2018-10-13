import {connect} from 'dva';
import styles from './page.css'


const OptionPanel = ({text})=>{
  const OptItem = ({text})=>{
    return <div className={styles.opt_item}>{text}</div>
  }
  return <div>
    <div>您还可以选择x注号码</div>

    <div className={styles.opt_items}>
      <OptItem text='+继续选号'/>
      <OptItem text='+机选1注'/>
      <OptItem text='+机选5注'/>
      <OptItem text='+全部选号'/>
    </div>
  </div>
}

const SelectedNos = ()=>{
  const OptItem = ({text})=>{
    return <div className={styles.seleted_item}>{text}</div>
  }
  return <div>
    <div>已选号码</div>

    <div className={styles.opt_items}>
      <OptItem text='+继续选号'/>
      <OptItem text='+机选1注'/>
      <OptItem text='+机选5注'/>
      <OptItem text='+全部选号'/>
    </div>
  </div>
}

const LotteryNos = ()=>{
  return <div>

  </div>
}


function LotterySel(props) {
  return (
    <div className={styles.container}>
      {/*菜单面板*/}
      <OptionPanel/>
      {/*所选号码*/}
      <SelectedNos/>
      {/*选号面板*/}
      <LotteryNos/>
    </div>
  );
}

export default connect(state => {
  return {
    pageData: state.lotteryselect
  };
})(LotterySel);
