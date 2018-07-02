import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Image} from 'cloudinary-react';

const VacancyApplyItem = ({from, apply, applyViewedHandler, responsing}) => {

  return (
    <article className="media">
      <div className="media-left">
        <figure className="image is-96x96">
          <Image cloudName="dpf2wcgaq" publicId={apply.profile.avatar} />
        </figure>
      </div>
      <div className="media-content">
        <div className="content">
          <p className="is-marginless">
            <Link to={{
              pathname: `/developers/${apply.profile.username}`,
              state: {
                developer: true,
                from
              }
            }} className="is-size-5 has-text-black">{`${apply.profile.name} ${apply.profile.surname}`}</Link>
          </p>
          <p className="has-text-grey">{apply.profile.specialty}</p>
          <div className="tags" style={{margin: '20px 0'}}>
            {
              apply.profile.skills.map(skill => (
                <span key={skill} className="tag">{skill}</span>
              ))
            }
          </div>
        </div>
      </div>
      <div className="media-right">
        {!apply.isWatched ?
          (
            <button
              onClick={applyViewedHandler}
              className={'button is-link' + (responsing ? ' is-loading' : '')}>
              Отметить как просмотренное
            </button>
          ) : (
            <button className="button is-link is-outlined" disabled>Просмотрено</button>
          )
        }
      </div>
    </article>
  )
};

const mapStateToProps = state => ({
  responsing: state.vacancies.responsing
});

export default connect(mapStateToProps)(VacancyApplyItem);
