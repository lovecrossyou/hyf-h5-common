import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import styles from './page.css';
import sort_img_down_active from './images/icon_down_active.png';
import sort_img_down from './images/icon_down.png';
import sort_img_up from './images/icon_up.png';
import sort_img_up_active from './images/icon_up_active.png';

// 数据模型
// sortable '' 无选择
// sortable asc 选择升序
// sortable desc 选择降序


class FilterItemModel {
  constructor(title, active = false, index, sortable = null) {
    this.title = title;
    this.sortable = sortable;
    this.index = index;
  }
}


const SortView = ({ item }) => {
  if (item.sortable == null) return null;
  return <div className={styles.sort_wrapper}>
    <img src={item.sortable === 'asc' ? sort_img_up_active : sort_img_up} alt="" className={styles.sort_img}/>
    <img src={item.sortable === 'desc' ? sort_img_down_active : sort_img_down} alt="" className={styles.sort_img}/>
  </div>;
};


class FilterItemView extends React.Component {

  state = {
    active: false,
  };

  componentWillMount() {
    const { item, active } = this.props;
    this.setState({
      active: active,
    });
  }

  render() {
    const { item, active, onChange } = this.props;
    return <div
      onClick={() => {
        onChange && onChange(item);
      }}
      className={styles.filter_item_wrapper}>
      <div className={active ? styles.filter_tilte_title_active : styles.filter_tilte_title}>{item.title}</div>
      <SortView item={item}/>
    </div>;
  }
}


const itemModels = [
  new FilterItemModel('综合', false, 0),
  new FilterItemModel('价格', false, 1, ''),
  new FilterItemModel('销量', false, 2, ''),
  new FilterItemModel('筛选', false, 3),
];


export default class ClassifyFilter extends React.Component {

  state = {
    activeIndex: 0,
  };

  handleFilter = item => {
    //重置其他的选择
    itemModels.forEach(d => {
      if (d.title !== item.title) {
        if (d.sortable) {
          d.sortable = '';
        }
      }
    });
    let sortable = item.sortable;
    if (sortable != null) {
      if (sortable === '') {
        sortable = 'asc';
      }
      else if (sortable === 'asc') {
        sortable = 'desc';
      }
      else {
        sortable = 'asc';
      }
      item.sortable = sortable;
    }
    this.setState({
      activeIndex: item.index,
    });
  };

  render() {
    return <div>
      <div className={styles.condition_sort}>
        {
          itemModels.map((item, index) => <FilterItemView
            item={item}
            active={this.state.activeIndex === index}
            key={'#' + index}
            onChange={item => {
              this.handleFilter(item);
            }}/>)
        }
      </div>
    </div>;
  }
}


