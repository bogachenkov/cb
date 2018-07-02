import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import isEmpty from '../../../store/utils/isEmpty';

import * as actions from '../../../store/actions/index';

import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner';
import Modal from '../../UI/Modal/Modal';
import Alert from '../../UI/Alert/Alert';

class ProfileEdit extends Component {

  state = {
    controls: {
      username: {
        type: 'text',
        placeholder: 'Адрес страницы *',
        value: '',
        help: 'Короткий адрес вашего профиля, например http://curlybraces.io/ivanov',
        addon: 'http://curlybraces.io/'
      },
      company: {
        type: 'text',
        placeholder: 'Компания',
        icon: 'fas fa-building',
        value: '',
        help: 'Название компании, в которой Вы сейчас работаете'
      },
      website: {
        type: 'text',
        placeholder: 'Личный сайт',
        icon: 'fas fa-globe',
        value: '',
        help: 'Ссылка на сайт или страницу, с Вашим порфтолио или описанием Ваших навыков'
      },
      location: {
        type: 'text',
        placeholder: 'Местоположение',
        icon: 'fas fa-map-marker-alt',
        value: '',
      },
      specialty: {
        type: 'text',
        placeholder: 'Специализация *',
        icon: 'fas fa-glasses',
        value: '',
        help: 'Укажите Вашу специализацию, например, `Full-stack Developer` или `JavaScript разработчик`'
      },
      searchingStatus : {
        controlType: 'select',
        options: ['Ищу работу', 'Не ищу работу'],
        placeholder: 'Поиск работы',
        icon: 'fas fa-search',
        value: 'Ищу работу',
      },
      skills : {
        type: 'text',
        placeholder: 'Навыки *',
        icon: 'fas fa-certificate',
        value: '',
        help: 'Перечислите Ваши навыки через запятую, например, `PHP, Laravel, JavaScript, Node.js`'
      },
      about : {
        controlType: 'textarea',
        placeholder: 'О себе',
        value: '',
      },
      github : {
        type: 'text',
        placeholder: 'Имя пользователя на github',
        icon: 'fab fa-github',
        value: '',
        help: 'Если Вы хотите, чтобы показывались ваши последние репозитории GitHub, укажите своё имя пользователя'
      },
    },
    changed: false
  }

  componentDidMount() {
    if (!isEmpty(this.props.profile)) {
      const { profile } = this.props;
      this.setState({
        ...this.state,
        controls: {
          username: {
            ...this.state.controls.username,
            value: profile.username || ''
          },
          company: {
            ...this.state.controls.company,
            value: profile.company || ''
          },
          website: {
            ...this.state.controls.website,
            value: profile.website || ''
          },
          location: {
            ...this.state.controls.location,
            value: profile.location || ''
          },
          specialty: {
            ...this.state.controls.specialty,
            value: profile.specialty || ''
          },
          searchingStatus: {
            ...this.state.controls.searchingStatus,
            value: profile.searchingStatus || 'Ищу работу'
          },
          skills: {
            ...this.state.controls.skills,
            value: profile.skills.join(', ') || ''
          },
          about: {
            ...this.state.controls.about,
            value: profile.about || ''
          },
          github: {
            ...this.state.controls.github,
            value: profile.github || ''
          },
        }
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const newProfile = nextProps.profile;
    const oldProfile = this.props.profile;
    if (newProfile !== oldProfile) this.setState({ changed: true });
    window.scrollTo(0, 0);
  }

  formSubmitHandler = (e) => {
    e.preventDefault();
    const { username, company, website, location, specialty, searchingStatus, skills, about, github } = this.state.controls;
    const profileData = {
      username: username.value,
      company: company.value,
      website: website.value,
      location: location.value,
      specialty: specialty.value,
      searchingStatus: searchingStatus.value,
      skills: skills.value,
      about: about.value,
      github: github.value,
    };
    this.props.onSubmit(profileData);
  }

  inputChangeHandler = (e, controlName) => {
    e.preventDefault();
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: e.target.value,
      }
    };
    this.setState({
      controls: updatedControls,
    })
  }

  render() {

    const { controls, changed } = this.state;
    const { errors, loading } = this.props;
    const inputsArray = [];
    for (let key in controls) {
      inputsArray.push({
        id: key,
        config: controls[key],
        error: errors[key]
      });
    }


    let loader = null;
    if (loading) {
      loader = (
        <Modal isActive>
          <Spinner />
        </Modal>
      )
    }

    return (
      <div className="columns">
        <div className="column is-8 is-offset-2 ">
          <Link to="/profile" className="button is-light">Назад</Link>
          <h1 className="is-size-1 has-text-centered" style={{fontWeight: '300'}}>Ваш профиль</h1>
          <h3 className="has-text-centered">Расскажите о себе, чтобы работодателям было проще найти Вас.</h3>
          <hr />
          { changed ? <Alert type="is-link">Изменения успешно сохранены!</Alert> : null }
          <form onSubmit={this.formSubmitHandler}>
            <p>Звёздочкой помечены поля, обязательные к заполнению.</p>
            <hr />
            {
              inputsArray.map((el) => (
                <Input
                  withLabel={true}
                  addon={el.config.addon}
                  key={el.id}
                  controlType={el.config.controlType}
                  options={el.config.options ? el.config.options : null}
                  type={el.config.type}
                  value={el.config.value}
                  icon={el.config.icon}
                  placeholder={el.config.placeholder}
                  error={el.error}
                  help={el.config.help}
                  changed={(event) => this.inputChangeHandler(event, el.id)}
                   />
              ))
            }
            <hr />
            <div className="control has-text-centered">
              <button className="button is-link is-outlined">Сохранить</button>
            </div>
            {loader}
          </form>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  loading: state.user.loading,
  profile: state.user.profile,
  errors: state.user.errors,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (profileData) => dispatch(actions.editProfile(profileData)),
  onMount: () => dispatch(actions.getProfile()),
  onAppLoadCheckAuth: () => dispatch(actions.authCheckState()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileEdit));
