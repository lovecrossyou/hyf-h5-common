import React from 'react';
import { connect } from 'dva';

function A(props) {
  return <div>
    hello
  </div>;
}

export default connect(state => {
  return {
    store: state.astro
  };
})(A);
