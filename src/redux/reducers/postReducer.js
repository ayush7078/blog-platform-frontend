import { FETCH_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST, SEARCH_POSTS} from '../actions/postActions';

const initialState = {
  posts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
      case SEARCH_POSTS:
        return {
          ...state,
          posts: action.payload, 
                };
    default:
      return state;
  }
};

export default postReducer;
