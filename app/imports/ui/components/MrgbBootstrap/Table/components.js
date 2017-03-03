/* @flow */

import React from 'react';
import classNames from 'classnames';

type TableProps = {
  children?: React.Element<*>,
  striped?: boolean,
  bordered?: boolean,
  hover?: boolean,
  condensed?: boolean,
  responsive?: boolean,
};

export const Table = ({
  children,
  striped,
  bordered,
  hover,
  condensed,
  responsive,
}: TableProps) => {
  const tableClassNames = classNames({
    table: true,
    'table-striped': striped && true,
    'table-bordered': bordered && true,
    'table-hover': hover && true,
    'table-condensed': condensed && true,
    'table-responsive': responsive && true,
  });
  return (
    <table className={tableClassNames}>
      {children}
    </table>
  );
};
