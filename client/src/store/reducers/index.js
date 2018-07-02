import { combineReducers } from 'redux';

import authReducer from './auth';
import registerReducer from './register';
import userReducer from './user';
import developersReducer from './developers';
import feedReducer from './feed';
import postsReducer from './posts';
import addPostReducer from './addPost';
import commentsReducer from './comments';
import addCommentReducer from './addComment';
import vacanciesReducer from './vacancies';
import addVacancyReducer from './addVacancy';

export default combineReducers({
  auth: authReducer,
  register: registerReducer,
  user: userReducer,
  developers: developersReducer,
  feed: feedReducer,
  post: postsReducer,
  addPost: addPostReducer,
  comments: commentsReducer,
  addComment: addCommentReducer,
  vacancies: vacanciesReducer,
  addVacancy: addVacancyReducer
});
