import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Image} from 'cloudinary-react';

import * as actions from '../../store/actions/index';

import Input from '../UI/Input/Input';
import Wrapper from '../../HOC/Wrapper/Wrapper';

class AddPost extends Component {

  state = {
    isOpen: false,
    controls: {
      title: {
        type: 'text',
        placeholder: 'Заголовок',
        value: ''
      },
      content: {
        controlType: 'textarea',
        placeholder: 'Введите текст',
        value: ''
      },
      tags: {
        type: 'text',
        placeholder: 'Перечислите теги через запятую',
        value: ''
      }
    },
    image: {
      filename: '...'
    }
  }

  toggleFormHanlder = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.posts.length > prevProps.posts.length) {
      this.setState({
        controls: {
          title: {
            ...this.state.controls.title,
            value: ''
          },
          content: {
            ...this.state.controls.content,
            value: ''
          },
          tags: {
            ...this.state.controls.tags,
            value: ''
          }
        },
        isOpen: false
      })
    }
  }

  changeHandler = (e, controlName) => {
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

  fileAttachedHandler = (e) => {
    if (e.target.files.length) {
      this.setState({
        image: {
          filename: e.target.files[0].name
        }
      })
    } else {
      this.setState({
        image: {
          filename: '...'
        }
      })
    }
  }

  submitHandler = (e) => {
    e.preventDefault();

    const { title, content, tags } = this.state.controls;

    const data = new FormData();
    data.append('title', title.value);
    data.append('content', content.value);
    data.append('tags', tags.value);
    data.append('image', this.uploadImageInput.files[0]);

    this.props.onSubmit(data);
  }

  render() {

    const inputsArray = [];
    const { controls, isOpen, image } = this.state;
    const { user, loading, errors } = this.props;

    for (let key in controls) {
      inputsArray.push({
        id: key,
        config: this.state.controls[key],
        error: this.props.errors[key]
      });
    }

    return (
      <Wrapper>
        {
          isOpen ? (
            <article className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <Image cloudName="dpf2wcgaq" publicId={user.avatar} />
                </p>
              </figure>
              <div className="media-content">
                <form onSubmit={this.submitHandler}>
                  {
                    inputsArray.map((el) => (
                      <Input controlType={el.config.controlType}
                        key={el.id}
                        value={el.config.value}
                        placeholder={el.config.placeholder}
                        changed={(e) => this.changeHandler(e, el.id)}
                        error = {(errors && errors[el.id]) ? errors[el.id] : null}
                        />
                    ))
                  }
                  <div className="field file has-name">
                    <label className="file-label">
                      <input
                        onChange={this.fileAttachedHandler}
                        ref={(ref) => { this.uploadImageInput = ref; }}
                        className="file-input"
                        type="file"
                        name="image" />
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fas fa-upload"></i>
                        </span>
                        <span className="file-label">
                          Выбрать изображение
                        </span>
                      </span>
                      <span className="file-name">
                        {image.filename}
                      </span>
                    </label>
                  </div>
                  {
                    errors.image ?
                    (
                      <p className="help is-danger">
                        {errors.image}
                      </p>
                    ) : null
                  }
                  <br />
                  <nav className="level">
                    <div className="level-left">
                      <div className="level-item">
                        <button className={ loading ? "button is-link is-loading" : "button is-link"}>Отправить</button>
                      </div>
                    </div>
                  </nav>
                </form>
              </div>
            </article>
          ) : null
        }
        <button onClick={this.toggleFormHanlder} className="button is-fullwidth is-link is-outlined" style={{marginTop: '15px'}}>
          {
            isOpen ? "Закрыть" : "Добавить пост"
          }
        </button>
      </Wrapper>
    );
  }

}

const mapStateToProps = state => ({
  user: state.user.profile,
  errors: state.addPost.errors,
  loading: state.addPost.loading,
  posts: state.feed.posts
})

const mapDispatchToProps = dispatch => ({
  onSubmit: (postData) => dispatch(actions.addPost(postData))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
