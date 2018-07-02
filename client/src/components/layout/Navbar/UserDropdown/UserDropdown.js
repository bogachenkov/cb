import React from 'react';
import { Link } from 'react-router-dom';
import {Image} from 'cloudinary-react';

const UserDropdown = ({user}) => {
  return (
    <div className="navbar-item has-dropdown is-hoverable is-hidden-mobile">
        <Link className="navbar-link" to="/profile">
        <Image cloudName="dpf2wcgaq"
               publicId={user.avatar}
               style={{
                 borderRadius: '50%',
                 marginRight: '10px'
               }}/>
          {user.name}
        </Link>
        <div className="navbar-dropdown is-right">
          <Link className="navbar-item" to="/profile">
            Мой профиль
          </Link>
          <hr className="navbar-divider" />
          <Link className="navbar-item" to="/logout">
            Выход
          </Link>
        </div>
      </div>
  )
}

export default UserDropdown;
