import React from "react";
import { connect } from "dva";
import { NavBar, Icon } from "antd-mobile";
import router from "umi/router";
import withRouter from "umi/withRouter";
import config from "../utils/config";
import styles from "./index.css";

const {rootPages } = config;


const pageInArray = (pathname,arr)=>{
  let findPage = false ;
  for(let page of arr){
    if(pathname === page){
      findPage = true ;
      break ;
    }
  }
  return findPage ;
}


const isRootPage = props =>{
  const state = window.g_app._store.getState();
  const platform = state.global.platform ;
  return pageInArray(props.pathname,rootPages) && platform!==undefined ;
}

const Layout = props => {
  const state = window.g_app._store.getState();
  if(state.global.platform===undefined){
    return <div className={styles.wrapper}> {props.children}</div>;
  }
  return (
    <div>
      <NavBar
        mode="dark"
        className={styles.barColor}
        style={{ backgroundColor: "#fff",height:'1rem',position:"fixed",zIndex:"11",width:"100%",top:"0" }}
        icon={
          (props.pathname === "/main" || props.pathname === "/") ?null: (
            <Icon type="left" size={'lg'}/>
          )
        }
        onLeftClick={() => {
          if(isRootPage(props)){
            window.postMessage('goBack');
            return;
          }
          router.go(-1);
        }}
      >
        {props.text}
      </NavBar>
      <div style={{marginTop:'1rem'}}>
        {props.children}
      </div>
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
