import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';


class AddPhoto extends Component {

  state = {
    name: '...'
  }

  uploadPhoto = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('photo', this.uploadPhotoInput.files[0]);
    this.props.loadPhoto(data, this.props.id);
  }

  loadFileHandler = (e) => {
    this.setState({
      name: e.target.files[0].name
    })
  }

  render() {
    return (
      <article className="card">
        <form className="card-content" onSubmit={this.uploadPhoto} encType='multipart/form-data'>
          <div className="field">
            <div className="file is-large is-boxed has-name">
              <label className="file-label">
                <input
                  onChange={this.loadFileHandler}
                  ref={(ref) => { this.uploadPhotoInput = ref; }}
                  className="file-input" type="file" name="photo" />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-cloud-upload-alt"></i>
                  </span>
                  <span className="file-label">
                    Загрузите своё фото
                  </span>
                </span>
                <span className="file-name has-background-light has-text-centered">
                  {this.state.name}
                </span>
              </label>
            </div>
          </div>
          <button className="button is-link">Загрузить</button>
        </form>
      </article>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.developers.loading
})

const mapDispatchToProps = dispatch => ({
  loadPhoto: (data, id) => dispatch(actions.addPhoto(data, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)
