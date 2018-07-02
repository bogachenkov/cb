import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import RegisterForm from './RegisterForm';

const Register = (props) => {

  let content = (
    <div className="container">
      <div className="columns">
        <div className="column is-6-desktop is-offset-3-desktop">
          <article className="card">
            <div className="card-content">
              <p className="title has-text-centered">
                Регистрация
              </p>
              <RegisterForm withLabel="true" />
            </div>
          </article>
        </div>
      </div>
    </div>
  )

  if (props.isAuth) content = <Redirect to="/feed"/>

  return content;
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps)(Register)
