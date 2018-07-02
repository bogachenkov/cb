import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Wrapper from '../../HOC/Wrapper/Wrapper';

import './Template.scss';

const TemplateWrapper = (props) => {

  const renderIfAuth = (children) => (
    <Wrapper>
      <div className="Template-pattern"></div>
      <div className="container">
            <div className="columns">
              <div className="column is-10-desktop Template-main">
                {children}
              </div>
              <div className="column is-2 Template-sidebar">
                <Sidebar />
              </div>
            </div>
          </div>
    </Wrapper>
  )

  const renderIfNotAuth = (children) => (
    <div className="container" style={{padding: '55px 0'}}>
      {children}
    </div>
  )

  if (props.isAuth) {
    return renderIfAuth(props.children);
  } else {
    return renderIfNotAuth(props.children);
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
})

export default withRouter(connect(mapStateToProps)(TemplateWrapper))
