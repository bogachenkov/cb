import React, { Component } from 'react';
import { connect } from 'react-redux';

import { auth } from '../../../store/actions/index';

import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner';
import Modal from '../../UI/Modal/Modal';
import Wrapper from '../../../HOC/Wrapper/Wrapper';

class LoginForm extends Component {

  state = {
    controls: {
      email: {
        type: 'email',
        placeholder: 'Email',
        icon: 'fas fa-envelope',
        value: ''
      },
      password: {
        type: 'password',
        placeholder: 'Пароль',
        icon: 'fas fa-lock',
        value: ''
      }
    }
  }

  inputChangeHandler = (e, controlName) => {
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

    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    }

    this.props.onAuth(authData);

  }

  render() {

    const inputsArray = [];
    for (let key in this.state.controls) {
      inputsArray.push({
        id: key,
        config: this.state.controls[key],
        error: this.props.errors[key]
      });
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
      <Wrapper>
        <form onSubmit={this.formSubmitHandler}>
          {
            inputsArray.map((el) => (
              <Input
                withLabel={this.props.withLabel ? true : false}
                key={el.id}
                type={el.config.type}
                value={el.config.value}
                icon={el.config.icon}
                placeholder={el.config.placeholder}
                error={el.error}
                changed={(event) => this.inputChangeHandler(event, el.id)}
                 />
            ))
          }
          <div className="control has-text-centered">
            <button className="button is-link is-outlined">Войти</button>
          </div>
        </form>
        {loader}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  errors: state.auth.errors,
})

const mapDispatchToProps = dispatch => ({
  onAuth: (authData) => dispatch(auth(authData))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
