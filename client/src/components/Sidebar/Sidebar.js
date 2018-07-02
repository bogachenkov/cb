import React from 'react';
import { NavLink } from 'react-router-dom';

import './Sidebar.scss';

import SidebarLink from './SidebarLink/SidebarLink';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="menu">
        <p className="menu-label">
          Главное
        </p>
        <ul className="menu-list">
          <li>
            <SidebarLink to="/feed">
              <i className="fas fa-home"></i>
              Лента
            </SidebarLink>
          </li>
          <li>
            <SidebarLink to="/profile">
              <i className="fas fa-id-card"></i>
              Профиль
            </SidebarLink>
            <ul className="submenu">
              <li><NavLink exact to="/profile/edit">Основное</NavLink></li>
              <li><NavLink exact to="/profile/edit/education">Образование</NavLink></li>
              <li><NavLink exact to="/profile/edit/experience">Опыт работы</NavLink></li>
              <li><NavLink exact to="/profile/edit/contacts">Контакты</NavLink></li>
              <li><NavLink exact to="/profile/edit/social">Соцсети</NavLink></li>
            </ul>
          </li>
          <li>
            <SidebarLink to="/vacancies">
              <i className="fas fa-briefcase"></i>
              Вакансии
            </SidebarLink>
            <ul className="submenu">
              <p className="menu-label">
                Работодателю
              </p>
              <li><NavLink exact to="/vacancies/my">Мои вакансии</NavLink></li>
              <li><NavLink exact to="/vacancies/create">Создать вакансию</NavLink></li>
              <p className="menu-label">
                Соискателю
              </p>
              <li><NavLink exact to="/vacancies/responses">Мои отклики</NavLink></li>
            </ul>
          </li>
          <p className="menu-label">
            Дополнительно
          </p>
          <li>
            <SidebarLink to="/developers">
              <i className="fas fa-users"></i>
              Разработчики
            </SidebarLink>
          </li>
        </ul>

      </nav>
    </aside>
  )
}

export default Sidebar
