import * as types from '../actions/types';

const initialState = {
  posts: [],
  filteredPosts: [],
  tag: '',
  errors: {},
  loading: true,
}

const filterPostsByTagname = (posts, tag) => posts.filter((post) => post.tags.includes(tag));


export default function(state = initialState, action) {
  switch (action.type) {
    case types.POST_ADD_START:
      return {
        ...state,
        //loading: true
      };
    case types.POST_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.posts,
      };
    case types.POST_ADD_FAIL:
      return {
        ...state,
        loading: false,
      };
    case types.POST_GET_ALL_START:
      return {
        ...state,
      };
    case types.POST_GET_ALL_SUCCESS:
      return {
        ...state,
        posts: action.posts,
        errors: {},
        loading: false
      };
    case types.POST_GET_ALL_FAIL:
      return {
        ...state,
        errors: action.errors,
        loading: false
      };
    case types.POST_GET_BY_TAG:
      return {
        ...state,
        tag: action.tag,
        filteredPosts: filterPostsByTagname(state.posts, action.tag)
      };
    case types.POST_CLEAR_TAG:
      return {
        ...state,
        tag: '',
        filteredPosts: []
      };
    case types.POST_DELETE_START:
      return {
        ...state,
//loading: true
      };
    case types.POST_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: {}
      };
    default:
      return state;
  }
}
