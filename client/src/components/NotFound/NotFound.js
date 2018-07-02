import React from 'react';
import { Link } from 'react-router-dom';

import img from './404.png'

const NotFound = (props) => {
  return (
    <div className="has-text-centered">
      <img src={img} alt="404 - Страница не найдена!" />
      <br />
      <Link to="/" className="button is-link is-outlined">
        Вернуться на главную
      </Link>
    </div>
  )
}

export default NotFound
