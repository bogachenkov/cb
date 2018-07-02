import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {addVacancy, clearVId} from '../../../store/actions/index';

import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner';
import Modal from '../../UI/Modal/Modal';

class AddVacancy extends Component {

  state = {
    controls: {
      title: {
        type: 'text',
        placeholder: 'Требуемая должность *',
        value: '',
        help: 'Например, JavaScript-разработчик'
      },
      description: {
        controlType: 'textarea',
        placeholder: 'Описание вакансии *',
        value: ''
      },
      company: {
        type: 'text',
        placeholder: 'Название компании *',
        value: ''
      },
      location: {
        type: 'text',
        placeholder: 'Местоположение',
        value: '',
        help: 'Местоположение Вашей компании'
      },
      salary: {
        type: 'text',
        placeholder: 'Заработная плата',
        value: '',
      },
      employment: {
        controlType: 'select',
        options: ['Любая', 'Работа в офисе', 'Удаленная работа', 'Вахтовый метод'],
        placeholder: 'Тип работы',
        value: 'Любая',
      },
      jobType: {
        controlType: 'select',
        options: ['Любой', 'Полная занятость', 'Частичная занятость', 'Временная работа', 'На один проект', 'Стажировка'],
        placeholder: 'Тип занятости',
        value: 'Любой',
      },
      skills: {
        type: 'text',
        placeholder: 'Навыки *',
        value: '',
        help: 'Укажите через запятую навыки, требуемые от соискателя'
      }
    }
  }

  componentWillUnmount() {
    this.props.clearVId();
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
    const { title, description, company, location, salary, employment, jobType, skills } = this.state.controls;
    const data = {
      title: title.value,
      description: description.value,
      company: company.value,
      location: location.value,
      salary: salary.value,
      employment: employment.value,
      jobType: jobType.value,
      skills: skills.value,
    }

    this.props.addVacancy(data);

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

    return this.props.v_id ? <Redirect to={`/vacancies/${this.props.v_id}`} /> : (
      <div className="columns">
        <div className="column is-8 is-offset-2 column is-6-widescreen is-offset-3-widescreen">
          <h1 className="is-size-1 has-text-centered" style={{fontWeight: '300'}}>Новая вакансия</h1>
          <h3 className="has-text-centered">Подробно заполните все поля, чтобы заинтересовать потенциального работника.</h3>
          <hr />
          <form onSubmit={this.formSubmitHandler}>
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
            <div className="control has-text-centered">
              <button className="button is-link is-outlined">Отправить</button>
            </div>
          </form>
        </div>
        {loader}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.addVacancy.loading,
  errors: state.addVacancy.errors,
  v_id: state.addVacancy.v_id
})

const mapDispatchToProps = dispatch => ({
  addVacancy: (data) => dispatch(addVacancy(data)),
  clearVId: () => dispatch(clearVId())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddVacancy);
