import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadMyResponses } from '../../store/actions/index';

import Spinner from '../UI/Spinner/Spinner';
import VacanciesItem from './VacanciesItem';

class Responses extends Component {

  componentWillMount() {
    this.props.loadMyResponses()
  }

  render() {

    const { loading, vacancies } = this.props;

    let toRender = <Spinner />;
    if (!loading && vacancies) {
      if (vacancies.length > 0) {
        toRender = vacancies.map((vacancy) => (
          <VacanciesItem key={vacancy._id} vacancy={vacancy} />
        ))
      }
      else {
        toRender = <p className="has-text-centered has-text-grey">Список пуст.</p>
      }
    }

    return (
      <div className="columns">
        <div className="column is-8 is-offset-2">
          <h1 className="is-size-1 has-text-centered" style={{fontWeight: '300'}}>Отклики</h1>
          <h3 className="has-text-centered">Список вакансиий, на которые Вы откликнулись.</h3>
          <hr />
          {toRender}
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  loading: state.vacancies.loading,
  vacancies: state.vacancies.vacancies
})

const mapDispatchToProps = dispatch => ({
  loadMyResponses: () => dispatch(loadMyResponses())
})

export default connect(mapStateToProps, mapDispatchToProps)(Responses)
