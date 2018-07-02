import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../store/utils/isEmpty';

import * as actions from '../../../store/actions/index';

import Spinner from '../../UI/Spinner/Spinner';
import Modal from '../../UI/Modal/Modal';
import Input from '../../UI/Input/Input';
import Alert from '../../UI/Alert/Alert';

class Education extends Component {

  state = {
    controls: {
      university: {
        type: 'text',
        placeholder: 'Название*',
        help: 'Название учебного заведения',
        value: ''
      },
      faculty: {
        type: 'text',
        placeholder: 'Факультет*',
        value: ''
      },
      specialty: {
        type: 'text',
        placeholder: 'Специальность*',
        value: ''
      },
      location: {
        type: 'text',
        placeholder: 'Местоположение',
        help: 'Адрес учебного заведения',
        value: ''
      },
      from: {
        type: 'date',
        placeholder: 'Дата начала учебы*',
        value: ''
      },
      to: {
        type: 'date',
        placeholder: 'Дата окончания учебы',
        help: 'Если Вы еще продолжаете обучение, выберите пункт "По настоящее время" ниже',
        value: ''
      },
      current: {
        controlType: 'checkbox',
        placeholder: 'По настоящее время',
        value: false
      },
      additionally: {
        controlType: 'textarea',
        placeholder: 'Дополнительно',
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
    const { university, faculty, specialty, location, from, to, current, additionally } = this.state.controls;
    const data = {
      university: university.value,
      faculty: faculty.value,
      specialty: specialty.value,
      location: location.value,
      from: from.value,
      to: to.value,
      current: current.value,
      additionally: additionally.value,
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
          <h1 className="is-size-1 has-text-centered" style={{fontWeight: '300'}}>Образование</h1>
          <h3 className="has-text-centered">Укажите, какие учебные заведения вы оканчивали</h3>
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
  onSubmit: (data) => dispatch(actions.addEducation(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Education);
