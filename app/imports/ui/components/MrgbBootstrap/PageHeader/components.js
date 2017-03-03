/* @flow */

import React from 'react';
import classNames from 'classnames';

type PageTitleProps = {
  children?: React.Element<*>,
  className?: string,
  style?: {},
};

export const PageTitle = ({
  children,
  className,
  style,
}: PageTitleProps) => {
  const classes = classNames('mrg-page-header-title', className);

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};

type PageToolbarProps = {
  children?: React.Element<*>,
  className?: string,
  style?: {},
};

export const PageToolbar = ({
  children,
  className,
  style,
}: PageToolbarProps) => {
  const classes = classNames('mrg-page-header-toolbar', className);

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};

type PageHeaderProps = {
  children?: React.Element<*>,
  className?: string,
  style?: {},
};

export default ({ children, className, style }: PageHeaderProps) => {
  const classes = classNames(className, 'mrg-page-header');

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};
