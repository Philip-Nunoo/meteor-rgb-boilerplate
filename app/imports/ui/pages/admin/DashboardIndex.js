/* @flow */

import React from 'react';
import {
  PageHeader,
  PageTitle,
  PageToolbar,
} from '/imports/ui/components/MrgbBootstrap';

export default () =>
  <div>
    <PageHeader>
      <PageTitle>
        <h1>
          Admin Dashboard
          <small>statistics, charts, recent events and reports</small>
        </h1>
      </PageTitle>
      <PageToolbar>
        <i className="icon-settings" />
      </PageToolbar>
    </PageHeader>
    <div>
      Admin Dashboard Index
    </div>
  </div>;
