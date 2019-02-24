import React from 'react';
import classNames from 'classnames/bind';

import styles from './Month.module.scss';

export default (props) => {
  const cx = classNames.bind(styles);
  const className = cx({
    container: true,
    hidden: props.hidden
  });

  return (
    <div className={className}> MONTH VIEW </div>
  );
}
