import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Image} from 'cloudinary-react';

import * as actions from '../../../store/actions/index';

import './Photo.scss';

import Modal from '../../UI/Modal/Modal';
import Wrapper from '../../../HOC/Wrapper/Wrapper';
import AddPhoto from './AddPhoto';

class Photo extends Component {
  state = {
    isActive: false
  }

  toggleFormHandler = () => {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  deleteHandler = (e) => {
    e.preventDefault();
    this.props.deletePhoto();
  }

  render() {
    const {profile, errors} = this.props;

    let error = null;
    if (errors.image) error = <p className="has-text-danger has-text-centered">{errors.image}</p>;

    const defaultPublicId = 'avatars/avatar-1577909_640.png';
    const avatarIsUploaded = defaultPublicId !== profile.avatar;
    return (
      <Wrapper>
        <div className="Photo">
          <Image cloudName="dpf2wcgaq" publicId={profile.avatar} />
          {
            this.props.editable ? (
              <div className="Photo-hover">
                {
                  avatarIsUploaded ?
                    <a onClick={this.deleteHandler} className="has-text-white">
                      <i className="fas fa-trash-alt"></i>
                    </a>
                  :
                    <a onClick={this.toggleFormHandler} className="has-text-white">
                      <i className="fas fa-upload"></i>
                    </a>
                }
              </div>
            ) : null
          }
        </div>
        {error}
        <Modal isActive={this.state.isActive} onClose={this.toggleFormHandler}>
          <AddPhoto id={profile._id} />
        </Modal>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.user.loading,
  errors: state.user.errors
})

const mapDispatchToProps = dispatch => ({
  deletePhoto: () => dispatch(actions.deletePhoto())
})

export default connect(mapStateToProps, mapDispatchToProps)(Photo)
