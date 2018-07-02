import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './SidebarLink.scss';

class SidebarLink extends Component {

  render() {
    return (
      <NavLink to={this.props.to} className="SidebarLink" activeClassName="is-active">
        {this.props.children}
      </NavLink>
    )
  }
}

export default withRouter(SidebarLink)
