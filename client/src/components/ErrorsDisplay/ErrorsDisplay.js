import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Modal from '../UI/Modal/Modal';
import Alert from '../UI/Alert/Alert';

class ErrorsDisplay extends Component {

  state = {
    closed: false
  }

  onClose = () => {
    this.setState({
      closed: true
    })
  }

  render () {

    const {children, redirect} = this.props;

    if (this.state.closed) return <Redirect to={redirect} />;
    return (
      <Modal isActive onClose={this.onClose}>
        <Alert type="is-danger" onClose={this.onClose}>
          {children}
        </Alert>
      </Modal>
    )
  }
}


export default ErrorsDisplay;
