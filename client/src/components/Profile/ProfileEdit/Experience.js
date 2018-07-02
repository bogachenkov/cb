import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../store/utils/isEmpty';

import * as actions from '../../../store/actions/index';

import Spinner from '../../UI/Spinner/Spinner';
import Modal from '../../UI/Modal/Modal';
import Input from '../../UI/Input/Input';
import Alert from '../../UI/Alert/Alert';

class Experience extends Component {

  state = {
    controls: {
      title: {
        type: 'text',
        placeholder: 'Должность*',
        help: 'Ваша должность в компании',
        value: ''
      },
      company: {
        type: 'text',
        placeholder: 'Название',
        help: 'Название компании',
        value: ''
      },
      location: {
        type: 'text',
        placeholder: 'Местоположение',
        help: 'Адрес компании',
        value: ''
      },
      from: {
        type: 'date',
        placeholder: 'Дата начала работы*',
        value: ''
      },
      to: {
        type: 'date',
        placeholder: 'Дата окончания работы',
        help: 'Если Вы еще продолжаете работать в данной компании, выберите пункт "По настоящее время" ниже',
        value: ''
      },
      current: {
        controlType: 'checkbox',
        placeholder: 'По настоящее время',
        value: false
      },
      description: {
        controlType: 'textarea',
        placeholder: 'Описание',
        helper: 'Дополнительная информация о процессе обучения',
        value: ''
      },
    },
    disabled: true
  }

  componentDidMount() {
    if (!isEmpty(this.props.profile)) {
      this.setState({
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
    const { title, company, location, from, to, current, description } = this.state.controls;
    const data = {
      title: title.value,
      company: company.value,
      location: location.value,
      from: from.value,
      to: to.value,
      current: current.value,
      description: description.value,
    };
    this.props.onSubmit(data);
  }

  inputChangeHandler = (e, controlName) => {
    let value = e.target.value;
    if (e.target.type === 'checkbox') value = !this.state.controls[controlName].value;
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value
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
          <h1 className="is-size-1 has-text-centered" style={{fontWeight: '300'}}>Опыт работы</h1>
          <h3 className="has-text-centered">Укажите свой опыт работы</h3>
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
  onSubmit: (data) => dispatch(actions.addExperience(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Experience);
