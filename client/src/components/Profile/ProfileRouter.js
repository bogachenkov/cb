import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Profile from './Profile';
import Contacts from './ProfileEdit/Contacts';
import Social from './ProfileEdit/Social';
import Education from './ProfileEdit/Education';
import Experience from './ProfileEdit/Experience';
import ProfileEdit from './ProfileEdit/ProfileEdit';
import Spinner from '../UI/Spinner/Spinner';
import NotFound from '../NotFound/NotFound';

class ProfileRouter extends Component {

  componentWillMount() {
    //this.props.onLoadProfile();
  }

  render() {
    return this.props.user ? (
      <Switch>
        <Route exact path="/profile" render={() => <Profile profile={this.props.user} />} />
        <Route exact path="/profile/edit" component={ProfileEdit} />
        <Route exact path="/profile/edit/contacts" component={Contacts} />
        <Route exact path="/profile/edit/social" component={Social} />
        <Route exact path="/profile/edit/education" component={Education} />
        <Route exact path="/profile/edit/experience" component={Experience} />
        <Route component={NotFound} />
      </Switch>
    ) : <Spinner />
  }
}

const mapStateToProps = state => ({
  user: state.user.profile,
  loading: state.user.loading
})

const mapDispatchToProps = dispatch => ({
  onLoadProfile: () => dispatch(actions.getProfile()),

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileRouter));
