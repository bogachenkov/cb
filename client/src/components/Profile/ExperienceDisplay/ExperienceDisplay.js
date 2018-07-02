import React, { Component } from 'react';
import './ExperienceDisplay.scss';
import m from 'moment';
import 'moment/locale/ru';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class ExperienceDisplay extends Component {

  componentDidMount() {
    m.locale('ru');
  }

  deleteExpHandler = (exp_id) => {
    this.props.onDelete(exp_id)
  }

  render() {

    const {exp} = this.props;

    return (
      <div>
        <p className="About-section has-text-grey-light">Опыт работы</p>
        <table className="ExperienceDisplay" cellSpacing="0" cellPadding="0">
          <tbody>
            {exp.map((item) => (
              <tr key={item.company+Date.now()}>
                <td className=" col1 is-capitalized has-text-weight-semibold">{item.company}</td>
                <td>
                  <p className="has-text-weight-semibold">{item.title}</p>
                  <p>{item.location}</p>
                  <p>С {m(item.from).format('Do MMMM YYYY')}</p>
                  <p>{item.current ? "по настоящее время" : `до: ${m(item.to).format('Do MMMM YYYY')}`}</p>
                  <p>{item.description}</p>
                </td>
                {(this.props.profileID === this.props.user._id) ?
                  <td width="100px">
                    <button
                      onClick={() => this.deleteExpHandler(item._id)}
                      className="button is-danger is-outlined"
                      to="/profile/edit">
                      Удалить
                    </button>
                  </td>
                  : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.profile
})

const mapDispatchToProps = dispatch => ({
  onDelete: (exp_id) => dispatch(actions.deleteExperience(exp_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceDisplay);
