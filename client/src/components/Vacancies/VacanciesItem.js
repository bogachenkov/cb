import React from 'react';
import m from 'moment';
import 'moment/locale/ru';
import { Link, withRouter } from 'react-router-dom';
import {Image} from 'cloudinary-react';

const VacanciesItem = ({vacancy, location, withCounter}) => {

  m.locale('ru');

  let counterElement = null;

  if (withCounter) {
    const notWatchedCounter = vacancy.applies.reduce((total, el) => total + (el.isWatched === true ? 0 : 1), 0);
    if (notWatchedCounter) counterElement = <span className="tag is-danger">+{notWatchedCounter}</span>;
  }

  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <Link to={{
              pathname: `/developers/${vacancy.profile.username}`,
              state: {
                from: location.pathname,
                developer: true
              }
            }}>
          <Image cloudName="dpf2wcgaq" publicId={vacancy.profile.avatar} />
          </Link>
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <h5 className="is-size-5">
            <Link className="has-text-black" to={{
                pathname: `/vacancies/${vacancy._id}`,
                state: {
                  from: location.pathname
                }
              }}>
              {vacancy.title}
            </Link> {withCounter ? counterElement : null}
          </h5>
          <p className="has-text-grey">
            {vacancy.skills.join(' • ')}
          </p>
          <p>
            <strong>{vacancy.company}</strong> • {vacancy.location} • {vacancy.salary}
            <br />
            <strong>Тип работы:</strong> {vacancy.employment}
            <br />
            <strong>Занятость:</strong> {vacancy.jobType}
          </p>
        </div>
      </div>
      <div className="media-right">
        <span className="has-text-grey-light">{m(vacancy.date).format('DD MMMM YYYY')}</span>
      </div>
    </article>
  )
}

export default withRouter(VacanciesItem)
