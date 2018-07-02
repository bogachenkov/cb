import React, { Component } from 'react';
import {connect} from 'react-redux';
import {searchVacancies} from '../../../store/actions/index';

import Input from '../../UI/Input/Input';

class SearchVacancy extends Component {

  state = {
    search: {
      type: 'search',
      placeholder: 'Поиск по вакансиям',
      icon: 'fas fa-search',
      value: ''
    }
  };

  componentDidMount() {
    this.setState({
      search: {
        ...this.state.search,
        value: this.props.search
      }
    });
  }

  changeHandler = (e) => {
    this.setState({
      search: {
        ...this.state.search,
        value: e.target.value
      }
    }, () => {
      this.props.onChange(this.state.search.value)
    })
  };

  render() {
    return (
      <Input type={this.state.search.type}
             placeholder={this.state.search.placeholder}
             icon={this.state.search.icon}
             value={this.state.search.value}
             changed={this.changeHandler}
      />
    );
  }
}

const mapStateToProps = state => ({
  search: state.vacancies.search
});

const mapDispatchToProps = dispatch => ({
  onChange: (search) => dispatch(searchVacancies(search))
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchVacancy)
