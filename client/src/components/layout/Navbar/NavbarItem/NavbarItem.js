import React from 'react'
import { NavLink } from 'react-router-dom';

const NavbarItem = ({classes, to, children}) => {

  let className = "navbar-item";
  if (classes) {
    className += ` ${classes}`;
  }
  return (
    <NavLink to={to} className={className} activeClassName="is-active">{children}</NavLink>
  )
}

export default NavbarItem
