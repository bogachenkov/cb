import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {Image} from 'cloudinary-react';

import m from 'moment';
import 'moment/locale/ru';

import * as actions from '../../store/actions/index';

import './Post.scss';

class Post extends Component {

  componentDidMount() {
    m.locale('ru');
  }

  deletePostHandler = (post_id) => {
    this.props.onDelete(post_id);
  }

  render() {

    const { post, user, location } = this.props;

    return (
        <article className="media Post">
          {
            (user._id === post.profile._id) ?
            <span className="Post-remove has-text-danger has-pointer" onClick={() => this.deletePostHandler(post._id)}><i className="fas fa-trash-alt"></i></span>
            : null
          }
          <figure className="media-left">
            <p className="image is-64x64">
              <Image className="Post-avatar" cloudName="dpf2wcgaq" publicId={post.profile.avatar} />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p>
                <Link
                    className="has-text-weight-light has-text-black is-underlined"
                    to={{
                      pathname: `/developers/${post.profile.username}`,
                      state: {
                         from: location.pathname,
                         developer: true
                       }
                    }}>
                  {`${post.profile.name} ${post.profile.surname}`}
                </Link>
                <br />
                <small className="has-text-grey-light">{m(post.publish_date).format('DD MMMM YYYY в HH:mm')}</small>
              </p>
              <h3>
                <Link className="has-text-black" to={`/feed/${post._id}`}>
                  {post.title}
                </Link>
              </h3>
              <p className="Post-content">
                {post.image ? (
                  <span className="image is-fullwidth">
                    <Image cloudName="dpf2wcgaq"
                           publicId={post.image}
                           style={{
                             marginBottom: '15px'
                           }}  />
                  </span>
                ) : null}
                {post.content.length > 300 ? `${post.content.slice(0, 300)}...` : post.content}
              </p>
              <p>
                <Link className="Post-show-more" to={`/feed/${post._id}`}>
                  <span>Показать полностью</span>
                  <span>
                    <i className="fas fa-comment-alt"></i> {post.comments.length}

                  </span>
                </Link>
              </p>

            </div>
          </div>
        </article>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.profile
})

const mapDispatchToProps = dispatch => ({
  onDelete: (data) => dispatch(actions.deletePost(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
