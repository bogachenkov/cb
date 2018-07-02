import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

export default (CheckingComponent) => {
  class Authentication extends Component {

    componentWillMount() {
      if (!this.props.isAuth) {
        this.props.history.push({
          pathname: '/login',
          state: {
            flash: 'Для просмотра данной страницы, войдите на сайт'
          },
          search: `?from=${this.props.location.pathname}`
        })
      }
    }

    render() {
      return <CheckingComponent {...this.props} />
    }

  }

  const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
  });

  return withRouter(connect(mapStateToProps)(Authentication));

}
