/* @flow */

import React from 'react';
import Panel, { PanelTitle, PanelBody } from './PanelComponent';

export default () =>
  <div>
    <h4>Basic example</h4>
    <p>
      Create mrgbpanel with &lt;Panel /&gt;
    </p>
    <Panel>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod&nbsp;
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,&nbsp;
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo&nbsp;
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse&nbsp;
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat&nbsp;
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Panel>
    <p>
      Panel with title.
    </p>
    <Panel fit>
      <PanelTitle>
        Light Panel with title
      </PanelTitle>
      <PanelBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod&nbsp;
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,&nbsp;
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo&nbsp;
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse&nbsp;
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat&nbsp;
        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </PanelBody>
    </Panel>
  </div>;
