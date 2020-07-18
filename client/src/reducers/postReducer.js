import {ADD_POST,GET_POSTS,POST_LOADING,GET_POST,CLEAR_ERRORS,GET_MYPOST,GET_FEATURED_POSTS,GET_TRENDING_POSTS,GET_FRESH_POSTS,DELETE_POST,GET_CATEGORIES} from "../actions/types";
import {ADVENTURE_POST} from "../actions/types";

const initialState = {
    posts: [],
    post: null,
    loading:false,
    categories:[],
    category:{},
    freshPosts:[],
    trendingPosts:[],
    featuredPosts:[],
    myPosts:[],
    adventurePosts:[],
}

export default function(state = initialState,action){
    switch(action.type){
        case POST_LOADING:
            return {
                ...state,
                loading:true
            }
            case GET_POSTS:
            return {
                ...state,
                posts:action.payload,
                loading:false
            }
            case GET_MYPOST:
            return {
                ...state,
                myPosts:action.payload,
                loading:false
            }
            case GET_FRESH_POSTS:
            return {
                ...state,
                freshPosts:action.payload,
                loading:false
            }
            case GET_TRENDING_POSTS:
                return {
                    ...state,
                    trendingPosts:action.payload,
                    loading:false
                }
                case GET_FEATURED_POSTS:
                return {
                    ...state,
                    featuredPosts:action.payload,
                    loading:false
                }
                case ADVENTURE_POST:
                    return {
                        ...state,
                        adventurePosts:action.payload,
                        loading:false
                    }
            case GET_CATEGORIES:
            return {
                ...state,
                categories:action.payload,
                loading:false
            }
            case GET_POST:
                return {
                    ...state,
                    post:action.payload,
                    loading:false
                }
            case ADD_POST:
            return {
                ...state,
                posts:[action.payload, ...state.posts]
            }
            case DELETE_POST:
            return {
              ...state,
              posts: state.posts.posts.filter(post => post._id !== action.payload),
              loading: false
      };
   
    default:
        return state;
    }
}