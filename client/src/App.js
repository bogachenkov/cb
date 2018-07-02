import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './components/layout/Navbar/Navbar';
import Landing from './components/layout/Landing/Landing';

import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import Logout from './components/auth/Logout/Logout';

import NotFound from './components/NotFound/NotFound';

import FeedRouter from './components/Feed/FeedRouter';
import ProfileRouter from './components/Profile/ProfileRouter';
import DevelopersRouter from './components/Developers/DevelopersRouter';
import VacanciesRouter from './components/Vacancies/VacanciesRouter';

import RequireAuth from './HOC/RequiredAuth/RequiredAuth';
import Wrapper from './HOC/Wrapper/Wrapper';

import Spinner from './components/UI/Spinner/Spinner';
import Modal from './components/UI/Modal/Modal';

import TemplateWrapper from './components/TemplateWrapper/TemplateWrapper';

import * as actions from './store/actions/index';

class App extends Component {

  componentWillMount() {
    this.props.onAppLoadCheckAuth();
  }

  render() {

    if (this.props.loading) return (
      <Modal isActive>
        <Spinner />
      </Modal>
    );

    return (
      <Router>
          <TemplateWrapper>
            <Route path="/" render={() => (
              <Wrapper>
                <Navbar />
              </Wrapper>
            )} />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/register" component={Register} />
              <Route path="/feed" component={RequireAuth(FeedRouter)} />
              <Route path="/profile" component={RequireAuth(ProfileRouter)  } />
              <Route path="/developers" component={RequireAuth(DevelopersRouter)}/>
              <Route path="/vacancies" component={RequireAuth(VacanciesRouter)}/>
              <Route exact path="/" component={Landing} />
              <Route component={NotFound} />
            </Switch>
          </TemplateWrapper>
        </Router>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading
})

const mapDispatchToProps = dispatch => ({
  onAppLoadCheckAuth: () => dispatch(actions.authCheckState())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
