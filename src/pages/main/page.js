import {connect} from 'dva';
import styles from './page.less';
import Link from 'umi/link';

function App(props) {
  return (
    <div className={styles.normal}>
      <br/>
      <br/>
      <Link to="/member/page"><h1>会员</h1></Link>
      <br/>
      <Link to="/wallet/page"><h1>钱包</h1></Link>
      <br/>
      <Link to="/lotteryselect/page"><h1>双色球&3D选号</h1></Link>
      <br/>
      <Link to="/astro/page"><h1>星座</h1></Link>
      <br/>
      <Link to="/address/page"><h1>地址管理</h1></Link>
      <br/>
      <Link to="/astro/ImprovePersonalData"><h1>完善资料</h1></Link>
      <br/>
      <Link to="/personInfo/page"><h1>用户信息</h1></Link>
      <br/>
      <Link to="/member/payResult"><h1>vip支付结果</h1></Link>
      <br/>
      <Link to="/rule/page"><h1>活动规则</h1></Link>
    </div>
  );
}

export default connect(state => {
  return {
    pageData: state.main
  };
})(App);
