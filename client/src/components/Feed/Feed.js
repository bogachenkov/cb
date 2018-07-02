import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

import isEmpty from '../../store/utils/isEmpty';
import * as actions from '../../store/actions/index';

import AddPost from '../Post/AddPost';
import Spinner from '../UI/Spinner/Spinner';
import Post from '../Post/Post';

import './Feed.scss';

class Feed extends Component {

  componentDidMount() {
    let tag = (new URLSearchParams(this.props.location.search)).get('tag');
    this.props.onLoad(tag);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.search && prevProps.location.search !== this.props.location.search) {
      const params = new URLSearchParams(this.props.location.search);
      const tag = params.get('tag');
      console.log('sooq',tag);
      this.props.getByTag(tag);
    }
    if (!this.props.location.search && prevProps.location.search) {
      this.props.clearTag();
    }
  }

  componentWillUnmount() {
    this.props.clearTag();
  }

  render() {

    const { loading, posts, filteredPosts, tag, errors } = this.props;
    let content =  <Spinner />;

    if (!loading) {
      if (posts.length > 0) {
        if (!isEmpty(filteredPosts)) {
          const postsArray = (
            filteredPosts.map((post) => (
              <Post key={post._id} post={post} />
            ))
          );

          content = (
            <CSSTransitionGroup
              transitionName="posts_animation"
              transitionEnterTimeout={600}
              transitionLeaveTimeout={300}>
              {postsArray}
            </CSSTransitionGroup>
          );

        } else {

          if (this.props.tag) {
            content = <p>По данному тегу ничего не найдено!</p>
          } else {
            const postsArray = (
              posts.map((post) => (
                <Post key={post._id} post={post} />
              ))
            );
            content = (
              <CSSTransitionGroup
                transitionName="posts_animation"
                transitionEnterTimeout={600}
                transitionLeaveTimeout={300}>
                {postsArray}
              </CSSTransitionGroup>
            );
          }
        }

      } else if (!isEmpty(errors)) {
        content = <p>{errors}</p>
      } else {
        content = <p className="has-text-centered has-text-grey">Ни одной записи не найдено</p>
      }
    }

    return (
      <div className="columns">
        <div className="column is-10 is-offset-1 is-8-widescreen is-offset-2-widescreen">
          <h1 className="is-size-1 has-text-centered" style={{fontWeight: '300'}}>Лента новостей</h1>
          <hr />
          <AddPost />
          <hr />
          {
            posts.length > 3 ? (
              <p className="has-text-centered has-margin-30">
                <i class="fas fa-exclamation-triangle"></i>
                <Link to="/feed/5b36311253ce822b56cadc56"> Ссылка на пост с информацией о сайте </Link>
                <i class="fas fa-exclamation-triangle"></i>
              </p>
            ) : null
          }
          {tag ? (
            <div>
              <Link to="/feed" className="button is-light">Назад в ленту</Link>
              <h4 className="title is-4 has-margin-30">Всё по тегу {tag}:</h4>
            </div>
          ) : null}
          {content}
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  posts: state.feed.posts,
  filteredPosts: state.feed.filteredPosts,
  loading: state.feed.loading,
  errors: state.feed.errors,
  tag: state.feed.tag
})

const mapDispatchToProps = dispatch => ({
  onLoad: (tag) => dispatch(actions.getAllPosts(tag)),
  getByTag: (tag) => dispatch(actions.getPostsByTag(tag)),
  clearTag: () => dispatch(actions.clearTagSearch())
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
