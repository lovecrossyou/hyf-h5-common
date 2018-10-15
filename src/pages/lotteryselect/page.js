import { connect } from 'dva';
import { Stepper ,ListView} from 'antd-mobile';

import styles from './page.css';
import { LotteryBall } from './components/LotteryBall';

const Tips3D = '选号规则与福彩3D相同，选择号码与当期开奖号码对应位置的号码相同，即中签。' ;
const TipsDOUBLE = '请选择6个红色球号码，1个蓝色球号码，中签号码以福彩双色球开奖结果为准。' ;

const OptionPanel = () => {
  return <div className={styles.opt_panel}>
    <div>
      您可选择 <span style={{ color: '#cc2636' }}>3组</span> 抽签号码
    </div>
    <BtnJiXuan/>
  </div>
};

const NumberGroup = ({ codes }) => {
  return <div className={styles.nos_balls}>
    {
      codes.map((code, index) => {
        return <LotteryBall text={code} key={index + '#'}/>;
      })
    }
  </div>;
};

// 一组号码
const SingleNumberPanel = () => {
  return <div className={styles.nos}>
    <NumberGroup codes={[2, 3, 6,]}/>
    <div>
      <Stepper
        showNumber
        max={10}
        min={1}
        defaultValue={1}
      />
    </div>
  </div>;
};

// 已选号码
const LotteryNos = () => {
  return <div className={styles.no_group}>
    <SingleNumberPanel/>
    <SingleNumberPanel/>
    <SingleNumberPanel/>
    <SingleNumberPanel/>
    <SingleNumberPanel/>
    <SingleNumberPanel/>
  </div>;
};

// 机选按钮
const BtnJiXuan = ()=>{
  return <div className={styles.jixuan}>全部机选</div>
}

// 福彩3D 选号面板
const SelectPanel3D = ({codes})=>{
  return <div className={styles.select_panel}>
    <div className={styles.tips}>{Tips3D}</div>
    <div className={styles.wrapper_3d}>
      <div className={styles.all_ball}>
        <LotteryBall text='0'/>
        <LotteryBall text='1'/>
        <LotteryBall text='2'/>
        <LotteryBall text='3'/>
        <LotteryBall text='4'/>
      </div>
      <div className={styles.all_ball}>
        <LotteryBall text='5'/>
        <LotteryBall text='6'/>
        <LotteryBall text='7'/>
        <LotteryBall text='8'/>
        <LotteryBall text='9'/>
      </div>
    </div>

    <div className={styles.btn_confirm}>
      确认
    </div>
  </div>
}

// 福彩双色球 选号面板
const SelectPanelFuCai = ()=>{
  return <div className={styles.select_panel}>
    <div className={styles.tips}>{TipsDOUBLE}</div>
    <div className={styles.wrapper_3d}>
      <div className={styles.all_ball}>
        <LotteryBall text='0'/>
        <LotteryBall text='1'/>
        <LotteryBall text='2'/>
        <LotteryBall text='3'/>
        <LotteryBall text='4'/>
      </div>
      <div className={styles.all_ball}>
        <LotteryBall text='5'/>
        <LotteryBall text='6'/>
        <LotteryBall text='7'/>
        <LotteryBall text='8'/>
        <LotteryBall text='9'/>
      </div>
    </div>

    <div className={styles.btn_confirm}>
      确认
    </div>
  </div>
}

const LotterySel = (props)=>{
  return (
    <div className={styles.container}>
      {/*菜单面板*/}
      <OptionPanel/>
      {/*已选号码*/}
      <LotteryNos/>
      {/*选号面板*/}
      {/*<SelectPanel3D/>*/}
      <SelectPanelFuCai/>
    </div>
  );
}

export default connect(state => {
  return {
    pageData: state.lotteryselect,
  };
})(LotterySel);
