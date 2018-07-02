import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import isEmpty from '../../store/utils/isEmpty';
import Spinner from '../UI/Spinner/Spinner';
import Wrapper from '../../HOC/Wrapper/Wrapper';

import About from './About/About';
import Social from './Social/Social';
import Education from './EducationDisplay/EducationDisplay';
import Photo from './Photo/Photo';
import GithubRepos from './GithubRepos/GithubRepos';

import './Profile.scss';

class Profile extends Component {

  state = {
    showAbout: true,
    showEdu: false,
    showGuthub: false,
    owner: true,
    goBack: '/developers'
  }

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.from) {
      this.setState({
        goBack: this.props.location.state.from
      })
    };
    if (this.props.location.state && this.props.location.state.developer) {
      this.setState({
        owner: false
      })
    }
  }

  showAboutHandler = () => {
    this.setState({
      showAbout: true,
      showEdu: false,
      showGuthub: false
    })
  }
  showEduHandler = () => {
    this.setState({
      showAbout: false,
      showEdu: true,
      showGuthub: false
    })
  }
  showGithubHandler = () => {
    this.setState({
      showAbout: false,
      showEdu: false,
      showGuthub: true
    })
  }

  render() {

    let profile = this.props.user;
    if (this.props.location.pathname.includes('developers')) profile = this.props.developer;

    let content = <Spinner />;
    let editButton = null;

    if (!isEmpty(profile)) {
      if (this.state.owner)
        editButton =
        <Link
          style={{
            marginTop: '15px'
          }}
          className="button is-link is-outlined"
          to="/profile/edit">
          Редактировать
        </Link>

        content = (
          <div className="Profile">
            <div className="columns is-mobile">

              <div className="column is-4-tablet is-3-mobile Profile-left">
                <div className="has-text-centered">
                  {!this.props.loading ? <Photo editable={this.state.owner} profile={profile} /> : <Spinner />}
                  {editButton}
                </div>
                <hr />
                <p className="About-section has-text-grey-light">Работа</p>
                { profile.company ? <p><span className="has-text-weight-semibold">Компания: </span>{profile.company}</p> : null }
                <p><span className="has-text-weight-semibold">Статус: </span>{profile.searchingStatus}</p>
                <hr />
                {
                  isEmpty(profile.social) ? null :
                  <Social social={profile.social} />
                }
              </div>

              <div className="column is-8 Profile-right">
                <h4 className="subtitle is-4 is-marginless">
                  {`${profile.name} ${profile.surname}`}
                  {
                    profile.location ? (
                      <span className="About-section has-text-grey-light" style={{marginLeft: '30px'}}>
                        <i className="fas fa-map-marker-alt" style={{marginRight: '10px'}}></i>
                        {profile.location}
                      </span>
                    ) : null
                  }
                </h4>
                <p className="has-text-link">{profile.specialty}</p>
                <div className="tags" style={{margin: '40px 0'}}>
                  { profile.skills.map((skill) => (
                    <span key={skill} className="tag">{skill}</span>
                  ))}
                </div>
                <div className="tabs">
                  <ul>
                    <li className={this.state.showAbout ? "is-active" : null}>
                      <a onClick={this.showAboutHandler}>
                        <span className="icon is-small"><i className="fas fa-info-circle" aria-hidden="true"></i></span>
                        <span>Обо мне</span>
                      </a>
                    </li>
                    {
                      profile.education.length > 0 ? (
                        <li className={this.state.showEdu ? "is-active" : null}>
                          <a onClick={this.showEduHandler}>
                            <span className="icon is-small"><i className="fas fa-graduation-cap" aria-hidden="true"></i></span>
                            <span>Образование</span>
                          </a>
                        </li>
                      ) : null
                    }
                    {
                      profile.github ? (
                        <li className={this.state.showGuthub ? "is-active" : null}>
                          <a onClick={this.showGithubHandler}>
                            <span className="icon is-small"><i className="fab fa-github" aria-hidden="true"></i></span>
                            <span>Репозитории</span>
                          </a>
                        </li>
                      ) : null
                    }
                  </ul>
                </div>

                { this.state.showAbout ? <About profile={profile} /> : null }
                { this.state.showEdu ? <Education profileID={profile._id} profile={profile} /> : null }
                { this.state.showGuthub ? <GithubRepos username={profile.github} /> : null }

              </div>

            </div>
          </div>
        )
    }

    return (
      <Wrapper>
        { !this.props.location.pathname.startsWith('/profile') ? <Link to={this.state.goBack} className="button is-light">Назад</Link> : null }
        { content }
      </Wrapper>
    );
  }

}

const mapStateToProps = state => ({
  user: state.user.profile,
  loading: state.user.loading,
  errors: state.user.errors
})

export default withRouter(connect(mapStateToProps)(Profile));
