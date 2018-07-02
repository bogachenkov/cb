import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Image} from 'cloudinary-react';
import { withRouter, Link } from 'react-router-dom';
import m from 'moment';
import 'moment/locale/ru';

import * as actions from '../../../store/actions/index';
import './FullPost.scss';

import Modal from '../../UI/Modal/Modal';
import Comments from '../../Comments/Comments';
import AddComment from '../../Comments/AddComment';
import ErrorsDisplay from '../../ErrorsDisplay/ErrorsDisplay';

class FullPost extends Component {

  componentDidMount() {
    this.props.onLoad(this.props.match.params.post_id);
    m.locale('ru');
  }

  onClose = () => {
    const {history} = this.props;
    return history.push('/feed');
  }

  render() {

    const { errors, loading } = this.props;

    if (errors.nopost) return (
      <ErrorsDisplay redirect="/feed">
        {errors.nopost}
      </ErrorsDisplay>
    )

    let toRender = null;
    if (!loading) {
      const {post} = this.props;
      toRender = (
        <Modal isActive={true} onClose={this.onClose}>
          <div className="modal-card FullPost">
            <header className="modal-card-head">
              <p className="image is-64x64">
                <Image className="FullPost-avatar" cloudName="dpf2wcgaq" publicId={post.profile.avatar} />
              </p>
              <p className="FullPost-username">
                <Link to={{
                    pathname: `/developers/${post.profile.handle}`,
                    state: {
                      from: this.props.location.pathname,
                      developer: true
                    }
                  }}
                  className="has-text-black">
                  {`${post.profile.name} ${post.profile.surname}`}
                </Link>
                <br />
                <small className="has-text-grey-light FullPost-date">{m(post.publish_date).format('DD MMMM YYYY в HH:mm')}</small>
              </p>

            </header>
            <section className="modal-card-body" style={{overflowX: 'hidden'}}>
              <h1 className="title is-3">{post.title}</h1>
              <p className="FullPost-content">
                {post.image ? (
                  <span className="image is-fullwidth">
                    <Image cloudName="dpf2wcgaq"
                           publicId={post.image}
                           style={{
                             marginBottom: '15px'
                           }}/>
                  </span>
                ) : null}
                {post.content}
              </p>
              <hr />
              {
                post.tags.length > 0 ?
                <p className="tags">
                  {
                    post.tags.map((tag, i) => (
                      <Link to={{
                        pathname: `/feed`,
                        search: `?tag=${tag}`
                        }}
                        key={tag + i} className="tag">{tag}</Link>
                    ))
                  }
                </p>
                : null
              }
              <hr />
              <Comments/>
            </section>
            <footer className="modal-card-foot">
              <AddComment postId={post._id} />
            </footer>
          </div>
          }
        </Modal>
      )
    }

    return toRender;
  }
}

const mapStateToProps = state => ({
  errors: state.post.errors,
  loading: state.post.loading,
  post: state.post.post
})

const mapDispatchToProps = dispatch => ({
  onLoad: (post_id) => dispatch(actions.getPost(post_id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FullPost));
