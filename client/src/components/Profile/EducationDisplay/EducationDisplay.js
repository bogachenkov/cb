import React, { Component } from 'react';
import m from 'moment';
import 'moment/locale/ru';
import isEmpty from '../../../store/utils/isEmpty';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class EducationDisplay extends Component {

  componentDidMount() {
    m.locale('ru');
  }

  renderDeleteButton = (edu_id) => {
    console.log(edu_id);
    if (this.props.profileID === this.props.user._id) return (
      <td width="100px">
        <button
          onClick={() => this.deleteEduHandler(edu_id)}
          className="button is-danger is-outlined"
          to="/profile/edit">
          Удалить
        </button>
      </td>
    )
    return null;
  }

  deleteEduHandler = (edu_id) => {
    this.props.onDelete(edu_id)
  }

  render() {
    const {education} = this.props.profile;

    const checkEduEmpty = () => {
      if (isEmpty(education)) return <p className="About-section has-text-grey-light">Информация об образовании не указана</p>;
      return (
        <div>
          <p className="About-section has-text-grey-light">Образование</p>
          <table className="ExperienceDisplay" cellSpacing="0" cellPadding="0">
            <tbody>
              {education.map((item) => (
                <tr key={item.university+Date.now()}>
                  <td className=" col1 is-capitalized has-text-weight-semibold">{item.university} {item.location ? `, ${item.location}` : ``}</td>
                  <td>
                    <p>Факультет: {item.faculty}</p>
                    <p>Специальность: {item.specialty}</p>
                    <p>С {m(item.from).format('Do MMMM YYYY')} {item.current ? "по настоящее время" : `до ${m(item.to).format('Do MMMM YYYY')}`}</p>
                    <p>{item.additionally}</p>
                  </td>
                  {this.renderDeleteButton(item._id)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return checkEduEmpty();
  }

}

const mapStateToProps = state => ({
  user: state.user.profile
})

const mapDispatchToProps = dispatch => ({
  onDelete: (edu_id) => dispatch(actions.deleteEducation(edu_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EducationDisplay);
