import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';

import Profile from '../Profile/Profile';
import Spinner from '../UI/Spinner/Spinner';
import ErrorsDisplay from '../ErrorsDisplay/ErrorsDisplay';

class DevelopersHandle extends Component {

  componentDidMount() {
    const {match} = this.props;
    this.props.onLoad(match.params.username);
  }


  render() {

    if (this.props.errors.noprofile) return (
      <ErrorsDisplay redirect="/developers">
        {this.props.errors.noprofile}
      </ErrorsDisplay>
    );

    const { loading, developer } = this.props;
    let profile = <Spinner />;

    if (!loading) {
      profile = <Profile developer={developer} />
    }

    return (
      <div>
        {profile}
      </div>
    )
  }

}

const mapStateToProps = state => ({
  loading: state.developers.loading,
  developer: state.developers.profile,
  errors: state.developers.errors
})

const mapDispatchToProps = dispatch => ({
  onLoad: (username) => dispatch(actions.getDeveloperByUsername(username))
})

export default connect(mapStateToProps, mapDispatchToProps)(DevelopersHandle)
