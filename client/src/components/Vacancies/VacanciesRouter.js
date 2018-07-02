import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Vacancies from './Vacancies';
import AddVacancy from './AddVacancy/AddVacancy';
import MyVacancies from './MyVacancies/MyVacancies';
import Vacancy from './Vacancy';
import Responses from './Responses';
import NotFound from '../NotFound/NotFound';

export default class VacanciesRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/vacancies" component={Vacancies} />
        <Route exact path="/vacancies/create" component={AddVacancy} />
        <Route exact path="/vacancies/my" component={MyVacancies} />
        <Route exact path="/vacancies/responses" component={Responses} />
        <Route exact path="/vacancies/:id" component={Vacancy} />
        <Route component={NotFound} />
      </Switch>
    );
  }

}
