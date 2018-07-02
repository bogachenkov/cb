import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';

import Input from '../UI/Input/Input';

class SearchForm extends Component {

  state = {
    search: {
      type: 'search',
      placeholder: 'Начните вводить имя или фамилию',
      icon: 'fas fa-search',
      value: ''
    }
  }

  componentDidMount() {
    this.setState({
      search: {
        ...this.state.search,
        value: this.props.searchName
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
  }

  render() {

    const { search } = this.state;

    return (
      <Input type={search.type}
        placeholder={search.placeholder}
        icon={search.icon}
        value={search.value}
        changed={this.changeHandler}
      />
    );
  }
}

const mapStateToProps = state => ({
  searchName: state.developers.searchName
})

const mapDispatchToProps = dispatch => ({
  onChange: (name) => dispatch(actions.searchDevelopers(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
