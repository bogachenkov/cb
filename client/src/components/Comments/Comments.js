import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Comment from './Comment';
import Spinner from '../UI/Spinner/Spinner';

import { connect } from 'react-redux';

import './Comments.scss'

class Comments extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.comments !== nextProps.comments;
  }

  render() {

    const {comments, loading} = this.props;

    let spinner = <Spinner />

    let commentsList = <p className="has-text-centered has-text-grey">Нет комментариев к данной записи.</p>;

    if (comments.length > 0) {
      const commentsArray = comments.map((cm) => (
        <Comment key={cm._id} comment={cm} />
      ));

      commentsList = (
        <CSSTransitionGroup
          transitionName="comments_animation"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          {commentsArray}
        </CSSTransitionGroup>
      )
    }

    return (
      <div>
        {loading ? spinner : commentsList}
      </div>
    );
  }

}

const mapStateToProps = state => ({
  comments: state.comments.comments,
  loading: state.comments.loading,
})

export default connect(mapStateToProps)(Comments);
