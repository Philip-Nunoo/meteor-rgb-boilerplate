/* @flow */

import React from 'react';
import { Link } from 'react-router';
import {
  Col,
  Row,
} from 'react-bootstrap';

import {
  PageHeader,
  PageTitle,
} from '/imports/ui/components/MrgbBootstrap';
import { Icons } from './config';

type Props = {
  icon: {},
};

type State = { showPreview: boolean };

class IconPreview extends React.Component {
  state: State;
  _triggerPreview: Function;

  constructor(props: Props) {
    super(props);

    this.state = { showPreview: false };

    this._triggerPreview = this._triggerPreview.bind(this);
  }

  _triggerPreview() {
    this.setState({ showPreview: !this.state.showPreview });
  }

  render() {
    const { icon } = this.props;
    const { showPreview } = this.state;

    return (
      <Col md={3} style={{ padding: '10px 10px 10px 20px' }}>
        <i className={icon.icon} style={{ verticalAlign: 'middle' }} />
        <Link
          style={{
            textDecoration: 'none',
            color: '#111',
            verticalAlign: 'middle',
            marginLeft: 8,
            display: 'inline-block',
          }}
          onClick={this._triggerPreview}
        >
          <span
            style={{
              textTransform: 'capitalize',
              display: !showPreview ? 'inline-block' : 'none',
            }}
          >
            {icon.name}
          </span>
          <span
            style={{
              marginLeft: 10,
              fontSize: 12,
              color: '#333',
              fontStyle: 'italic',
              display: showPreview ? 'inline-block' : 'none',
            }}
          >
            {icon.codePreview}
          </span>
        </Link>
      </Col>
    );
  }
}

const DashboardFontIcons = () =>
  <div>
    <PageHeader>
      <PageTitle>
        <h1>
          Font Icons
          <small>simple line icons</small>
        </h1>
      </PageTitle>
    </PageHeader>
    <Row>
      {Icons.map((icon, index) =>
        <IconPreview key={index} icon={icon} />
      )}
    </Row>
  </div>;

export default DashboardFontIcons;
