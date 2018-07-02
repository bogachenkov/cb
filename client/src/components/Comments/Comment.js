import React, { Component } from 'react';
import m from 'moment';
import 'moment/locale/ru';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import {Image} from 'cloudinary-react';

class Comment extends Component {

  componentDidMount() {
    m.locale('ru');
  }

  deleteCommentHandler = (comment_id, post_id) => {
    this.props.onDelete(comment_id, post_id);
  }

  render() {
    const {comment, user, post} = this.props;

    return (
      <article className="media">
        <figure className="media-left">
          <p className="image is-48x48 is-circle">
            <Image cloudName="dpf2wcgaq" publicId={comment.profile.avatar} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{`${comment.profile.name} ${comment.profile.surname}`}</strong>
              <br/>
            {comment.text}
            </p>
          </div>
        </div>
        <p className="media-right has-text-right">
          <small className="has-text-grey-light">{m(comment.publish_date).format('DD MMMM YYYY в HH:mm')}</small>
          <br />
          {
            (user.id === comment.profile._id) ?
            <a className="has-text-danger" onClick={() => this.deleteCommentHandler(comment._id, post._id)}>
              <i className="fas fa-trash-alt"></i>
            </a>
          : null }
        </p>
      </article>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.profile,
  post: state.post.post
})

const mapDispatchToProps = dispatch => ({
  onDelete: (comment_id, post_id) => dispatch(actions.deleteComment(comment_id, post_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
