import React, { Component } from 'react';

class Alert extends Component {

  state = {
    isShown: true
  }

  alertCloseHandler = () => {
    this.setState({
      isShown: false
    })
  }

  render() {

    const { type, onClose } = this.props;

    return this.state.isShown ? (
      <div className={type ? `notification ${type}` : `notification`}>
        <button className="delete"
                onClick={onClose ? onClose : this.alertCloseHandler}>
        </button>
        {this.props.children}
      </div>
    ) : null;
  }

}
export default Alert
