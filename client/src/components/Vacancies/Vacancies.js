import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loadAllVacancies} from '../../store/actions/index';

import Spinner from '../UI/Spinner/Spinner';
import Wrapper from '../../HOC/Wrapper/Wrapper';
import VacanciesItem from './VacanciesItem';
import SearchVacancy from './SearchVacancy/SearchVacancy';
import isEmpty from "../../store/utils/isEmpty";

class Vacancies extends Component {

  componentWillMount() {
    this.props.loadAllVacancies();
  }

  render() {

    const {filtered, vacancies} = this.props;
    let v_array = [];

    let toRender = <Spinner />;

    if (!this.props.loading) {
      if (!isEmpty(vacancies)) {
        if (!isEmpty(filtered)) {
          v_array = (filtered.map((vacancy) => (
            <VacanciesItem key={vacancy._id} vacancy={vacancy} />
          )))
        } else {
          if (this.props.search.length > 0) {
            v_array = <p className="has-text-centered has-text-grey-light is-size-5">По вашему запросу ничего не найдено</p>
          } else {
            v_array = (vacancies.map((vacancy) => (
              <VacanciesItem key={vacancy._id} vacancy={vacancy} />
            )))
          }
        }
        toRender =
          <Wrapper>
            <SearchVacancy/>
            <hr/>
            {v_array}
          </Wrapper>
      } else {
        toRender = <p className="has-text-centered has-text-grey-light is-size-5">Вакансий не найдено</p>
      }

    }
    return (
      <div className="columns">
        <div className="column is-10 is-offset-1 is-8-widescreen is-offset-2-widescreen">
          <h1 className="is-size-1 has-text-centered" style={{fontWeight: '300'}}>Вакансии</h1>
          <hr />
          {toRender}
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  loading: state.vacancies.loading,
  errors: state.vacancies.errors,
  vacancies: state.vacancies.vacancies,
  filtered: state.vacancies.filteredVacancies,
  search: state.vacancies.search
});

const mapDispatchToProps = dispatch => ({
  loadAllVacancies: () => dispatch(loadAllVacancies())
});

export default connect(mapStateToProps, mapDispatchToProps)(Vacancies);
