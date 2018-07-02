import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../store/utils/isEmpty';

import * as actions from '../../../store/actions/index';

import Spinner from '../../UI/Spinner/Spinner';
import Modal from '../../UI/Modal/Modal';
import Input from '../../UI/Input/Input';
import Alert from '../../UI/Alert/Alert';

class Contacts extends Component {

  state = {
    controls: {
      phone: {
        type: 'text',
        placeholder: 'Номер телефона',
        value: '',
        help: 'Телефон для связи',
        addon: '+7'
      },
      email: {
        type: 'email',
        placeholder: 'Email для связи',
        help: 'Email для связи',
        addonIco: 'fas fa-envelope',
        value: ''
      },
      telegram: {
        type: 'text',
        placeholder: 'Telegram',
        value: '',
        help: 'Телефон для связи',
        addonIco: 'fab fa-telegram'
      },
      skype: {
        type: 'text',
        placeholder: 'Skype',
        value: '',
        help: 'Телефон для связи',
        addonIco: 'fab fa-skype'
      }
    },
    disabled: true
  }

  componentDidMount() {
    if (!isEmpty(this.props.profile)) {
      const { profile } = this.props;
      this.setState({
        controls: {
          phone: {
            ...this.state.controls.phone,
            value: profile.contacts.phone || ''
          },
          email: {
            ...this.state.controls.email,
            value: profile.contacts.email || ''
          },
          telegram: {
            ...this.state.controls.telegram,
            value: profile.contacts.telegram || ''
          },
          skype: {
            ...this.state.controls.skype,
            value: profile.contacts.skype || ''
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
    const { phone, email, telegram, skype } = this.state.controls;
    const data = {
      phone: phone.value,
      email: email.value,
      telegram: telegram.value,
      skype: skype.value
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
    const contactsArray = [];
    for (let key in this.state.controls) {
        contactsArray.push({
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
          <h1 className="is-size-1 has-text-centered" style={{fontWeight: '300'}}>Контактные данные</h1>
          <h3 className="has-text-centered">Выберите способы связи.</h3>
          <hr />
          { this.state.changed ? <Alert type="is-link">Изменения успешно сохранены!</Alert> : null }
          {
            this.state.disabled ? <Alert type="is-warning">Сначала <Link to="/profile/edit">создайте свой профиль</Link>!</Alert> : null
          }
          <form onSubmit={this.formSubmitHandler}>
            {
              contactsArray.map((el) => (
                <Input
                  disabled={this.state.disabled}
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
  onSubmit: (data) => dispatch(actions.addContacts(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
