import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loadMyVacancies} from '../../../store/actions/index';
import SearchVacancy from '../SearchVacancy/SearchVacancy';

import Spinner from '../../UI/Spinner/Spinner';
import VacanciesItem from '../VacanciesItem';
import Alert from '../../UI/Alert/Alert';
import isEmpty from "../../../store/utils/isEmpty";
import Wrapper from "../../../HOC/Wrapper/Wrapper";

class MyVacancies extends Component {

  componentWillMount() {
    this.props.loadMyVacancies();
  }

  render() {

    const {filtered, vacancies} = this.props;

    let v_array = [];

    let toRender = <Spinner />;

    if (!this.props.loading) {
      if (!isEmpty(vacancies)) {
        if (!isEmpty(filtered)) {
          v_array = (filtered.map((vacancy) => (
            <VacanciesItem key={vacancy._id} vacancy={vacancy} withCounter={true} />
          )))
        } else {
          if (this.props.search.length > 0) {
            v_array = <p className="has-text-centered has-text-grey-light is-size-5">По вашему запросу ничего не найдено</p>
          } else {
            v_array = (vacancies.map((vacancy) => (
              <VacanciesItem key={vacancy._id} vacancy={vacancy} withCounter={true} />
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
          <h1 className="is-size-1 has-text-centered" style={{fontWeight: '300'}}>Мои вакансии</h1>
          <hr />
          {
            this.props.location.state && this.props.location.state.message ?
              <Alert type="is-link">{this.props.location.state.message}</Alert> : null
          }
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
  loadMyVacancies: () => dispatch(loadMyVacancies())
});

export default connect(mapStateToProps, mapDispatchToProps)(MyVacancies);
