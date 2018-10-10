import React from "react";
import { connect } from "dva";
import { NavBar, Icon } from "antd-mobile";
import router from "umi/router";
import withRouter from "umi/withRouter";
import config from "../utils/config";
import styles from "./index.css";

const {openPages } = config;


const Layout = props => {
  return <div className={styles.wrapper}> {props.children}</div>;
  if (openPages && openPages.includes(props.pathname)) {
    return <div> {props.children}</div>;
  }
  return (
    <div>
      <NavBar
        mode="dark"
        className={styles.barColor}
        style={{ backgroundColor: "#cc2636",height:'50px',position:"fixed",zIndex:"11",width:"100%",top:"0" }}
        icon={
          (props.pathname === "/main" || props.pathname === "/") ?null: (
            <Icon type="left" size={'lg'}/>
          )
        }
        onLeftClick={() => {
          //这里需要做指定式跳转，手机页面会涉及到用户刷新的问题
          router.go(-1);
        }}
      >
        {props.text}
      </NavBar>
      {props.children}
    </div>
  );
};


function mapStateToProps(state) {
  return {
    text: state.global.text,
    pathname: state.routing.location.pathname
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
