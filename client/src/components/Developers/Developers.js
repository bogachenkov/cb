import React, { Component } from 'react';
import { connect } from 'react-redux';

import isEmpty from '../../store/utils/isEmpty';
import * as actions from '../../store/actions/index';

import DevelopersItem from './DevelopersItem';
import Spinner from '../UI/Spinner/Spinner';
import Wrapper from '../../HOC/Wrapper/Wrapper';
import SearchForm from './SearchForm';

import './Developers.scss'

class Profiles extends Component {

  componentDidMount() {
    this.props.onLoad();
  }

  render() {

    const { profiles, filtered } = this.props;

    let profilesList = <Spinner />;
    let notfound = <p className="has-text-centered has-text-grey-light is-uppercase has-text-weight-light">Не найдено ни одного профиля</p>;

    if (!isEmpty(profiles)) {

      let devArray = notfound;

      if (!isEmpty(filtered)) {
          devArray = (filtered.map((profile) => (
            <DevelopersItem key={profile.username} profile={profile} />
          )))
      } else {
        if (this.props.searchName.length > 0) {
          devArray = notfound;
        } else {
          devArray = (profiles.map((profile) => (
            <DevelopersItem key={profile.username} profile={profile} />
          )))
        }
      }

      profilesList = (
        <Wrapper>
          <SearchForm />
          {devArray}
        </Wrapper>
      )
    }

    return (
      <div className="Developers column is-10 is-offset-1">
        <h1 className="is-size-1 has-text-centered" style={{fontWeight: '300'}}>Разработчики</h1>
        <hr />
        {profilesList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profiles: state.developers.profiles,
  filtered: state.developers.filteredProfiles,
  searchName: state.developers.searchName,
  errors: state.developers.errors
})

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(actions.getAllDevelopers())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
