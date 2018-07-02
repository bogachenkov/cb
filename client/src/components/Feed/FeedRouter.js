import React from 'react';
import { Route } from 'react-router-dom';

import FullPost from '../Post/FullPost/FullPost';
import Feed from './Feed';

const FeedRouter = () => {
  return (
    <div>
      <Route path="/feed" component={Feed} />
      <Route exact path="/feed/:post_id" component={FullPost} />
    </div>
  );
}

export default FeedRouter;
