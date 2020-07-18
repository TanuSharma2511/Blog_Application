import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getFeaturedPosts,getPost} from "../../actions/postAction";
import {Link} from "react-router-dom";
import Spinner from "../common/Spinner";
import "../../App.css";

 class FeaturedPosts extends Component {

    componentDidMount(){
        this.props.getFeaturedPosts();
    }
    getPostById(id){
      this.props.getPost(id)
   }

    render() {
        const {featuredPosts,loading} = this.props.post;
         console.log(featuredPosts.posts);

        let featuredPost;

        if(featuredPosts.posts=== undefined || loading){
            featuredPost = <Spinner />
          }
        else{
            featuredPost = (
                <div>
                 {featuredPosts.posts.map(item => (
              
              <div class="carousel-item">
              {/* <a href="#" class="image1"><img src={item.imgUrl} alt="" width="1100" height="500" /></a> */}
              <Link to={`/single/${item._id}`}><img src={item.imgUrl} onClick={() => this.getPostById(item._id)} alt="" /></Link>
                </div>
 
                 ))
          }
           </div>
          )
           }
         
        return (
            <div>
               
            
           
            {featuredPost}

          </div>
       
        )
    }
}

FeaturedPosts.propTypes = { 
    post: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
   
  }
  
  const mapStateToProps = (state) => ({
    post: state.post,
    errors:state.errors
  })
  
  export default connect(mapStateToProps, {getFeaturedPosts,getPost})(FeaturedPosts);

