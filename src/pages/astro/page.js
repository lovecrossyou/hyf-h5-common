import React from 'react';

import { connect } from 'dva';
import styles from './page.css';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';
import Horoscope from './components/Horoscope';

function Astro(props) {
  const { userInfo, constellationDetail } = props.store;
  if (userInfo == null) return null;
  const constellation = userInfo.userInfo.constellation;
  if (constellation === '') {
    return (
      <DocumentTitle title={props.title}>
        <div className={styles.astrology_container}>
          <div className={styles.astrology}>您还没有选择您的星座</div>
          <div className={styles.choose_astrology}>
            <button onClick={() => {
              props.dispatch(routerRedux.push('/astro/AstroItem'));
            }}>选择星座
            </button>
          </div>
        </div>
      </DocumentTitle>
    );
  }
  return <Horoscope data={constellationDetail}/>;
}

export default connect(state => {
  return {
    store: state.astro,
    title: state.global.text,
  };
})(Astro);
