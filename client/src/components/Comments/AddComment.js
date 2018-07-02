import React, { Component } from 'react';
import {Image} from 'cloudinary-react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Input from '../UI/Input/Input';

class AddComment extends Component {

  state = {
    text: {
      value: '',
      controlType: 'textarea',
      placeholder: 'Оставить комментарий...',
      rows: 2,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.comments.length > prevProps.comments.length) {
      this.setState({
        text: {
          ...this.state.text,
          value: '',
        }
      })
    }
  }

  changeHandler = (e) => {
    this.setState({
      text: {
        ...this.state.text,
        value: e.target.value
      }
    })
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onSubmit(
      {
      text: this.state.text.value
      },
      this.props.postId
    );
  }

  render() {

    const { text } = this.state;
    const { user, loading, errors } = this.props;

    return (
      <article className="media" style={{width: '100%'}}>

        <figure className="media-left">
          <p className="image is-64x64">
            <Image cloudName="dpf2wcgaq" publicId={user.avatar} />
          </p>
        </figure>

        <div className="media-content">
          <form onSubmit={this.submitHandler}>
            <Input controlType={text.controlType}
              value={text.value}
              placeholder={text.placeholder}
              invalid={text.isValid}
              rows={text.rows}
              changed={this.changeHandler}
              error={errors.text}
              />
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

    );
  }

}

const mapStateToProps = state => ({
  user: state.user.profile,
  errors: state.comments.errors,
  loading: state.addComment.loading,
  comments: state.comments.comments
})

const mapDispatchToProps = dispatch => ({
  onSubmit: (comment, post_id) => dispatch(actions.addComment(comment, post_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
