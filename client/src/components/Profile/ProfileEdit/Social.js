import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../store/utils/isEmpty';

import * as actions from '../../../store/actions/index';

import Spinner from '../../UI/Spinner/Spinner';
import Modal from '../../UI/Modal/Modal';
import Input from '../../UI/Input/Input';
import Alert from '../../UI/Alert/Alert';

class Social extends Component {

  state = {
    controls: {
      twitter: {
        type: 'text',
        placeholder: 'Twitter',
        help: 'Ссылка на Ваш профиль Twitter',
        addonIco: 'fab fa-twitter',
        value: ''
      },
      vk: {
        type: 'text',
        placeholder: 'Вконтакте',
        help: 'Ссылка на Ваш профиль Вконтакте',
        addonIco: 'fab fa-vk',
        value: ''
      },
      facebook: {
        type: 'text',
        placeholder: 'Facebook',
        help: 'Ссылка на Ваш профиль Facebook',
        addonIco: 'fab fa-facebook',
        value: ''
      },
      linkedin: {
        type: 'text',
        placeholder: 'LinkedIn',
        help: 'Ссылка на Ваш профиль LinkedIn',
        addonIco: 'fab fa-linkedin',
        value: ''
      },
    },
    disabled: true
  }

  componentDidMount() {
    if (!isEmpty(this.props.profile)) {
      const { profile } = this.props;
      this.setState({
        controls: {
          twitter: {
            ...this.state.controls.twitter,
            value: profile.social.twitter || ''
          },
          vk: {
            ...this.state.controls.vk,
            value: profile.social.vk || ''
          },
          facebook: {
            ...this.state.controls.facebook,
            value: profile.social.facebook || ''
          },
          linkedin: {
            ...this.state.controls.linkedin,
            value: profile.social.linkedin || ''
          },
        },
        disabled: false
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props.profile) this.setState({ changed: true });
    window.scrollTo(0, 0);
  }

  formSubmitHandler = (e) => {
    e.preventDefault();
    const { twitter, vk, facebook, linkedin } = this.state.controls;
    const data = {
      twitter: twitter.value,
      vk: vk.value,
      facebook: facebook.value,
      linkedin: linkedin.value
    };
    this.props.onSubmit(data);
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
      controls: updatedControls
    })
  }

  render() {
    const socialArray = [];
    for (let key in this.state.controls) {
        socialArray.push({
        id: key,
        config: this.state.controls[key],
        error: this.props.errors[key]
      })
    }

    let loader = null;
    if (this.props.loading) {
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
          <h1 className="is-size-1 has-text-centered" style={{fontWeight: '300'}}>Соцсети</h1>
          <h3 className="has-text-centered">Укажите учетные записи своих социальный сетей</h3>
          <hr />
          { this.state.changed ? <Alert type="is-link">Изменения успешно сохранены!</Alert> : null }
          {
            this.state.disabled ? <Alert type="is-warning">Сначала <Link to="/profile/edit">создайте свой профиль</Link>!</Alert> : null
          }
          <form onSubmit={this.formSubmitHandler}>
            {
              socialArray.map((el) => (
                <Input
                  withLabel={true}
                  addon={el.config.addon}
                  addonIco={el.config.addonIco}
                  key={el.id}
                  controlType={el.config.controlType ? el.config.controlType : null}
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
            <div className="control has-text-centered">
              <button className="button is-link is-outlined" disabled={this.state.disabled}>
                Сохранить
              </button>
            </div>
          </form>
          {loader}
        </div>
      </div>
    )
  }

}


const mapStateToProps = state => ({
  loading: state.user.loading,
  profile: state.user.profile,
  errors: state.user.errors
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (data) => dispatch(actions.addSocial(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Social);
