import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {ADD_POST,GET_ERRORS,GET_POSTS,POST_LOADING,GET_POST,GET_FRESH_POSTS,GET_MYPOST,CLEAR_ERRORS,GET_FEATURED_POSTS,GET_TRENDING_POSTS,GET_CATEGORIES} from "./types";
import {ADVENTURE_POST,DELETE_POST} from "./types";

export const createPost = (postData,history) => dispatch =>{
    dispatch(clearErrors());
    axios
      .post("http://localhost:3001/api/posts/new-post", postData)
     
      .then(() => dispatch(myPosts()))
     
        
      .catch(err => 
          dispatch({
              type:GET_ERRORS,
              payload:err.response.data
          })
          )
  };
  

  //Get Posts
export const getPosts = () => dispatch =>{
    dispatch(setPostLoading());
    axios
      .get("http://localhost:3001/api/posts/posts")
      .then(res => 
        dispatch({
            type:GET_POSTS,
            payload: res.data
        })
        )  
      .catch(err => 
          dispatch({
              type:GET_POSTS,
              payload:null
          })
          )
  };

  //Get Categories
export const getCategories = () => dispatch =>{
    dispatch(setPostLoading());
    axios
      .get("http://localhost:3001/api/category/categories")
      .then(res => 
        dispatch({
            type:GET_CATEGORIES,
            payload: res.data
        })
        )  
      .catch(err => 
          dispatch({
              type:GET_CATEGORIES,
              payload:null
          })
          )
  };

   //Get my Posts
export const myPosts = () => dispatch =>{
  dispatch(setPostLoading());
  axios
    .get("http://localhost:3001/api/posts/mypost")
    .then(res => 
      dispatch({
          type:GET_MYPOST,
          payload: res.data
      })
      )  
    .catch(err => 
        dispatch({
            type:GET_MYPOST,
            payload:null
        })
        )
};


  //Set Loading State
  export const setPostLoading = () => dispatch =>{
      return{
          type:POST_LOADING
      }
  }

  //Clear Errors
  export const clearErrors = () => dispatch =>{
    return{
        type:CLEAR_ERRORS
    }
}

 //Get Post
 export const getPost = (id) => dispatch =>{
    dispatch(setPostLoading());
    axios
      .get(`http://localhost:3001/api/posts/post/${id}`)
      .then(res => 
        dispatch({
            type:GET_POST,
            payload: res.data
        })
        )  
      .catch(err => 
          dispatch({
              type:GET_POST,
              payload:null
          })
          )
  };

  
  //Get Fresh Posts
export const getFreshStories = () => dispatch =>{
  dispatch(setPostLoading());
  axios
    .get("http://localhost:3001/api/posts/fresh-stories")
    .then(res => 
      dispatch({
          type:GET_FRESH_POSTS,
          payload: res.data
      })
      )  
    .catch(err => 
        dispatch({
            type:GET_FRESH_POSTS,
            payload:null
        })
        )
};

 //Get Trending Posts
 export const getTrendingPosts = () => dispatch =>{
  dispatch(setPostLoading());
  axios
    .get("http://localhost:3001/api/posts/trending-posts")
    .then(res => 
      dispatch({
          type:GET_TRENDING_POSTS,
          payload: res.data
      })
      )  
    .catch(err => 
        dispatch({
            type:GET_TRENDING_POSTS,
            payload:null
        })
        )
};

//Get Featured Posts
export const getFeaturedPosts = () => dispatch =>{
  dispatch(setPostLoading());
  axios
    .get("http://localhost:3001/api/posts/featured-posts")
    .then(res => 
      dispatch({
          type:GET_FEATURED_POSTS,
          payload: res.data
      })
      )  
    .catch(err => 
        dispatch({
            type:GET_FEATURED_POSTS,
            payload:null
        })
        )
};

  //Get individual category Post
  export const categoryPost = (id) => dispatch =>{
    dispatch(setPostLoading());
    axios
      .get(`http://localhost:3001/api/posts/posts/category/${id}`)
      .then(res => 
        dispatch({
            type:ADVENTURE_POST,
            payload: res.data
        })
        )  
      .catch(err => 
          dispatch({
              type:ADVENTURE_POST,
              payload:null
          })
          )
  };

  //Like Post
  export const likePost = (postId) => dispatch =>{
    dispatch(setPostLoading());
    axios
      .post(`http://localhost:3001/api/posts/like/${postId}`)
       .then(() => dispatch(myPosts()))
       .then(() => dispatch(getPosts()))
        
      .catch(err => 
          dispatch({
              type:GET_POST,
              payload:null
          })
          )
  };

  //Unlike Post
  export const unlikePost = (postId) => dispatch =>{
    dispatch(setPostLoading());
    axios
      .post(`http://localhost:3001/api/posts/unlike/${postId}`)  
      .then(() => dispatch(myPosts()))
      .then(() => dispatch(getPosts()))
      .catch(err => 
          dispatch({
              type:GET_POST,
              payload:null
          })
          )
  };
  
  //Delete Post
  export const deletePost = (postId) => dispatch =>{
    dispatch(getPosts());
    console.log(postId);
    axios
      .delete(`http://localhost:3001/api/posts/deletepost/${postId}`)  
      .then(res=>
         dispatch(getPosts())
        // dispatch({
        //    type: DELETE_POST,
        //    payload:postId
        // })
      )
  };

     