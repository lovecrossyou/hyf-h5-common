import React from 'react';
import {connect} from 'dva';

function QrCode(props) {
  return <div>
    hello!!!
  </div>;
}

export default connect(state => {
  return {
    store: state.astro
  };
})(QrCode);
