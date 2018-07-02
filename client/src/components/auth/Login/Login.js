import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import LoginForm from './LoginForm';
import Alert from '../../UI/Alert/Alert';

class Login extends Component {

  state = {
    redirectTo: '/feed'
  }

  componentWillMount() {
    if (this.props.location.search) {
      this.setState({
        redirectTo: this.props.location.search.split('?from=')[1]
      })
    }
  }

  render() {

    let content = (
      <div className="container">
        <div className="columns">
          <div className="column is-6-desktop is-offset-3-desktop">
            <article className="card">
              <div className="card-content">
                <p className="title has-text-centered">
                  Авторизация
                </p>
                { this.props.location.state ? (
                  <Alert>{this.props.location.state.flash}</Alert>
                ) :
                null
                }
                <LoginForm withLabel="true" />
              </div>
            </article>
          </div>
        </div>
      </div>
    )

    if (this.props.isAuth) content = <Redirect to={this.state.redirectTo}/>

    return content;
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps)(Login)
