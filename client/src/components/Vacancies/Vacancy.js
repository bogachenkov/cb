import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { loadVacancy, clearVacancy, responseVacancy, applyViewed, deleteVacancy } from '../../store/actions/index';

import Spinner from '../UI/Spinner/Spinner';
import VacancyApplyItem from './VacancyApplyItem/VacancyApplyItem';
import ErrorsDisplay from '../ErrorsDisplay/ErrorsDisplay';

import isEmpty from '../../store/utils/isEmpty';

class Vacancy extends Component {

  state = {
    goBack: '/vacancies'
  };

  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.loadVacancy(id);

    if (this.props.location.state && this.props.location.state.from) {
      this.setState({
        goBack: this.props.location.state.from
      })
    }
  }

  componentWillUnmount() {
    this.props.clearVacancy();
  }

  responseHandle = () => {
    const id = this.props.match.params.id;
    this.props.responseVacancy({id});
  };

  applyViewedHandler = (apply_id) => {
    this.props.applyViewed(
      this.props.vacancy._id,
      {
        apply_id
      }
    )
  };

  deleteVacancyHandler = (id) => {
    this.props.deleteVacancy(id);

  };

  renderResponseButton = () => {
    let button = null;
    const {vacancy, responsing, profile} = this.props;
    if (vacancy.profile._id !== profile._id) {
      if (vacancy.applies.find(el => ((el.profile._id === profile._id) || (el.profile === profile._id)))) {
        button =
          <button
            className='button is-link is-outlined'
            disabled>
            Вы откликнулись
          </button>
      } else {
        button =
          <button
            onClick={this.responseHandle}
            className={'button is-link' + (responsing ? ' is-loading' : '')}>
            Откликнуться
          </button>
      }
    }
    return button;
  };

  render() {

    let toRender = <Spinner/>
    let deleteButton = null;

    if (this.props.errors && this.props.errors.novacancy) return (
      <ErrorsDisplay redirect='/vacancies'>
        {this.props.errors.novacancy}
      </ErrorsDisplay>
    );

    if (!this.props.loading && this.props.vacancy) {
      const {vacancy} = this.props;
      const owner = vacancy.profile._id === this.props.profile._id;

      if (owner) deleteButton = (
        <button onClick={() => this.deleteVacancyHandler(vacancy._id)}
              className="button is-danger">
          Удалить
        </button>
      );

      toRender = (
        <div>
          <h1 className="is-size-1 has-text-centered" style={{fontWeight: '300'}}>Вакансия</h1>
          <hr/>
          <h4 className="is-size-4">
            {vacancy.title}
          </h4>
          <p className="has-text-grey">
            {vacancy.skills.join(' • ')}
          </p>
          <p>
            <strong>{vacancy.company}</strong> {`• ${vacancy.location}`} {vacancy.salary ? `• ${vacancy.salary}` : '• Зарплата не указана'}
            <br/>
            <strong>Тип работы:</strong> {vacancy.employment}
            <br/>
            <strong>Занятость:</strong> {vacancy.jobType}
          </p>
          <p>
            Добавлено пользователем:
            <Link to={{
              pathname: `/developers/${vacancy.profile.username}`,
              state: {
                developer: true,
                from: this.props.location.pathname,
              }
            }}>
              {` ${vacancy.profile.name} ${vacancy.profile.surname}`}
            </Link>
          </p>
          <hr/>
          <h5 className="is-size-5">
            Описание вакансии
          </h5>
          <p style={{whiteSpace: 'pre-line'}}>
            {vacancy.description}
          </p>
          <hr/>
          {this.renderResponseButton()}
          {
            owner && vacancy.applies.length > 0 ? (
              <div>
                <h5 className="title is-size-5 has-text-weight-normal">
                  Откликнулись:
                </h5>
                {vacancy.applies.sort((a, b) => {
                  if (!a.isWatched && b.isWatched) return -1;
                  if (a.isWatched && !b.isWatched) return 1;
                  return 0;
                }).map(apply => (
                  <VacancyApplyItem
                    key={apply.profile._id}
                    from={this.props.location.pathname}
                    applyViewedHandler={() => this.applyViewedHandler(apply._id)}
                    apply={apply}/>
                ))}
              </div>
            ) : null
          }
        </div>
      )
    }

    return (
      <div className="columns">
        {this.props.hasBeenDeleted ? <Redirect to={{pathname: '/vacancies/my',
          state: {
            message: 'Вакансия успешно удалена'
          }}}/> : null}
        <div className="column is-10 is-offset-1 is-8-widescreen is-offset-2-widescreen">
          {
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Link to={this.state.goBack}
                    className="button is-light">
                Назад
              </Link>
              { deleteButton }
            </div>
          }
          {toRender}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vacancy: state.vacancies.vacancy,
  profile: state.user.profile,
  loading: state.vacancies.loading,
  errors: state.vacancies.errors,
  responsing: state.vacancies.responsing,
  hasBeenDeleted: state.vacancies.hasBeenDeleted
});

const mapDispatchToProps = dispatch => ({
  loadVacancy: (id) => dispatch(loadVacancy(id)),
  clearVacancy: () => dispatch(clearVacancy()),
  responseVacancy: (id) => dispatch(responseVacancy(id)),
  applyViewed: (id, data) => dispatch(applyViewed(id, data)),
  deleteVacancy: id => dispatch(deleteVacancy(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Vacancy));
