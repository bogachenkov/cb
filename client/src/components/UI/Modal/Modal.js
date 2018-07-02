import React, { Component } from 'react';

import './Modal.scss';

class Modal extends Component {

  componentDidMount() {
    if (this.props.isActive) {
      document.querySelector('html').classList.add('is-clipped');
    }
  }

  componentWillUnmount() {
    document.querySelector('html').classList.remove('is-clipped');
  }

  render() {

    const { isActive, onClose, children } = this.props;

    return (
      <div className={isActive ? "modal is-active" : "modal"}>
        <div className="modal-background" onClick={onClose}></div>
        {children}
      </div>
    )
  }

}

export default Modal
