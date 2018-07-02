import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index';
import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner';
import Modal from '../../UI/Modal/Modal';

class RegisterForm extends Component {

  state = {
    controls: {
      name: {
        type: 'text',
        placeholder: 'Имя *',
        icon: 'fas fa-user-circle',
        value: ''
      },
      surname: {
        type: 'text',
        placeholder: 'Фамилия *',
        icon: 'far fa-user-circle',
        value: ''
      },
      username: {
        type: 'text',
        placeholder: 'Ваш ник *',
        icon: 'fas fa-user-astronaut',
        help: 'Используйте только символа латинского алфавита',
        value: ''
      },
      email: {
        type: 'email',
        placeholder: 'Email *',
        icon: 'fas fa-envelope',
        value: '',
        help: 'Данный email будет использоваться для входа, а также в качестве способа связи'
      },
      password: {
        type: 'password',
        placeholder: 'Пароль *',
        icon: 'fas fa-lock',
        value: '',
      },
      password_confirm: {
        type: 'password',
        placeholder: 'Повторите пароль *',
        icon: 'fas fa-lock',
        value: '',
      },
      specialty: {
        type: 'text',
        placeholder: 'Специализация *',
        icon: 'fas fa-briefcase',
        value: '',
        help: 'Ваша специализация, например, JavaScript-разработчик'
      },
      skills: {
        type: 'text',
        placeholder: 'Навыки *',
        icon: 'fas fa-cogs',
        value: '',
        help: 'Перечислите Ваши навыки через запятую, например: JavaScript, React.js, Express.js'
      }
    },
  }
  inputChangeHandler = (e, controlName) => {
    if (!e.isTrusted) return;
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

  formSubmitHandler = (e) => {
    e.preventDefault();

    const {
      name,
      surname,
      username,
      email,
      password,
      password_confirm,
      specialty,
      skills
    } = this.state.controls;

    const newUser = {
      name: name.value,
      surname: surname.value,
      username: username.value,
      email: email.value,
      specialty: specialty.value,
      skills: skills.value,
      password: password.value,
      password_confirm: password_confirm.value
    }

    this.props.onRegister(newUser);
  }

  render() {

    const inputsArray = [];
    for (let key in this.state.controls) {
      inputsArray.push({
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

    let authRedirect = null;
    if (this.props.isRegSuccess) {
      authRedirect =  <Redirect push to={{
              pathname: '/login',
              state: { flash: 'Регистрация прошла успешно, авторизуйтесь, чтобы продолжить' }
            }}  />
    }

    return (
      <div>
        <form autoComplete="nope" onSubmit={this.formSubmitHandler}>
          <input type="hidden" value="prayer" />
          {
            inputsArray.map((el) => (
              <Input
                withLabel={this.props.withLabel ? true : false}
                key={el.id}
                type={el.config.type}
                controlType={el.config.controlType}
                help={el.config.help}
                value={el.config.value}
                icon={el.config.icon}
                placeholder={el.config.placeholder}
                error={el.error}
                changed={(event) => this.inputChangeHandler(event, el.id)}
                 />
             ))
          }
          <hr />
          <div className="control has-text-centered">
            <button className="button is-link is-outlined">Зарегистрироваться</button>
          </div>
        </form>
        {loader}
        {authRedirect}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.register.loading,
  errors: state.register.errors,
  isRegSuccess: state.register.isRegisterSuccess,
});

const mapDispatchToProps = dispatch => ({
  onRegister: (userData) => dispatch(actions.register(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
