import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavbarItem from './NavbarItem/NavbarItem';
import UserDropdown from './UserDropdown/UserDropdown';
import { NavLink, withRouter } from 'react-router-dom';
import Wrapper from '../../../HOC/Wrapper/Wrapper';

import './Navbar.scss';

class Navbar extends Component {

  state = {
    burgerIsActive: false
  }

  burgerClickHandler = (e) => {
    e.preventDefault();
    this.setState({
      burgerIsActive: !this.state.burgerIsActive
    })
  }

  closeMenu = (e) => {
    this.setState({
      burgerIsActive: false
    })
  }

  render() {

    const { burgerIsActive } = this.state;
    const { isAuth, user } = this.props;

    return (
      <nav className="navbar is-white is-fixed-top" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <NavLink className="navbar-item navbar-logo" exact to="/">
              <span>&#123;C</span>
              urly<span>B</span>races
              <span>&#125;</span>
            </NavLink>
            <div className={"navbar-burger burger" + (burgerIsActive ? ' is-active' : '')}
                 data-target="navbarExampleTransparentExample"
                 onClick={this.burgerClickHandler}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className={"navbar-menu" + (burgerIsActive ? ' is-active' : '')}
               onClick={this.closeMenu}>
            <div className="navbar-end">
              {
                !isAuth ?
                (
                  <Wrapper>
                    <NavbarItem to="/login">Вход</NavbarItem>
                    <NavbarItem to="/register">Регистрация</NavbarItem>
                  </Wrapper>
                )
                :
                (
                  <Wrapper>
                    <UserDropdown user={user} />
                    <ul className="is-hidden-desktop menu-list">
                      <li>
                        <NavbarItem to="/feed">Лента</NavbarItem>
                      </li>
                      <li>
                        <NavbarItem to="/profile">Профиль</NavbarItem>
                        <ul className="submenu">
                          <li><NavbarItem exact to="/profile/edit">Основное</NavbarItem></li>
                          <li><NavbarItem exact to="/profile/edit/education">Образование</NavbarItem></li>
                          <li><NavbarItem exact to="/profile/edit/experience">Опыт работы</NavbarItem></li>
                          <li><NavbarItem exact to="/profile/edit/contacts">Контакты</NavbarItem></li>
                          <li><NavbarItem exact to="/profile/edit/social">Соцсети</NavbarItem></li>
                        </ul>
                      </li>
                      <li>
                        <NavbarItem to="/vacancies">Вакансии</NavbarItem>
                        <ul className="submenu">
                          <li><NavbarItem exact to="/vacancies/my">Мои вакансии</NavbarItem></li>
                          <li><NavbarItem exact to="/vacancies/create">Создать вакансию</NavbarItem></li>
                          <li><NavbarItem exact to="/vacancies/responses">Мои отклики</NavbarItem></li>
                        </ul>
                      </li>
                      <li>
                        <NavbarItem to="/developers">Разработчики</NavbarItem>
                      </li>
                    </ul>
                  </Wrapper>
                )
              }
              <div className="nav-mobile-menu"></div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  user: state.user.profile
})

export default withRouter(connect(mapStateToProps)(Navbar))
