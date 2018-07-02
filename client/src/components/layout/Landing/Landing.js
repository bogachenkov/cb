import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';

import Login from '../../auth/Login/LoginForm';

import './Landing.scss';

class Landing extends Component {

  render() {

    let content = (
      <div className="Landing">
        <div className="container">
          <div className="columns">
            <div className="column is-6 is-offset-3 has-text-centered">
              <h1 className="title has-text-weight-normal is-size-1">
                CurlyBraces
              </h1>
              <p className="subtitle">
                SPA-приложение с использованием React, Redux, MongoDB и Express.js
              </p>
              <p>
                Можно зарегистрировать свой профиль или воспользоваться образцом:
                <br />
                Email: <strong>example@user.ru</strong>
                <br />
                Пароль: <strong>123456</strong>
              </p>
                <article className="Landing-card">
                  <div className="Landing-card-body">
                    <Login />
                  </div>
                </article>
                <hr />
                <p>
                  Ещё не зарегистрированы? <Link to="/register">Сделайте это сейчас!</Link>
                </p>
            </div>
          </div>
        </div>
      </div>
    )

    if (this.props.isAuth) content = <Redirect to="/feed"/>

    return content;
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps)(Landing)
