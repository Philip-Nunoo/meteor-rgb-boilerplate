/* @flow */

import React from 'react';
import classNames from 'classnames';

type PanelProps = {
  children?: React.Element<*>,
  panelStyle?: 'light',
  className?: string,
  styles?: {},
  fit?: boolean,
};

type PanelTitleProps = {
  children?: React.Element<*>,
};

/** Panel Title **/
export const PanelTitle = ({ children }: PanelTitleProps) =>
  <div className="mrg-panel-title">
    {children}
  </div>;

/** Panel Body **/
export const PanelBody = ({ children }: PanelTitleProps) =>
  <div className="mrg-panel-body">
    {children}
  </div>;

/** Panel **/
export default ({
  children,
  className = '',
  fit,
  panelStyle = 'light',
}: PanelProps) => {
  const panelClass = classNames({
    'mrg-panel': true,
    light: true,
    fit: fit && true,
    bordered: true,
  });

  return (
    <div
      className={`${panelClass} ${className} ${panelStyle}`}
    >
      {children}
    </div>
  );
};
