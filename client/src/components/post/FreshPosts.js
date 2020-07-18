import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getFreshStories, getPost} from "../../actions/postAction";
import {Link} from "react-router-dom";
import Spinner from "../common/Spinner";
import "../../App2.css";

 class FreshPosts extends Component {

    componentDidMount(){
       this.props.getFreshStories();
    }
    getPostById(id){
       this.props.getPost(id)
    }
    render() {
        const {freshPosts,loading} = this.props.post;
        console.log(typeof freshPosts.posts);
         
        let freshPost ;

        if(freshPosts.posts === undefined || loading){
            freshPost = <Spinner />
          }
          else{
            freshPost = (
              <div class="mini-posts">
                    {freshPosts.posts.map(item => (
                  
                      <article>
											<a href={`/single/${item._id}`} class="image"><img src={item.imgUrl} onClick={() => this.getPostById(item._id)} alt="" /></a>
											<p>Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore aliquam.</p>
										</article>
                    ))}
                </div>
            )  
          }
        return (
          <div>
           {freshPost} 
           </div>
        )
    }
}

FreshPosts.propTypes = { 
    post: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
   
  }
  
  const mapStateToProps = (state) => ({
    post: state.post,
    errors:state.errors
  })
  
  export default connect(mapStateToProps, {getFreshStories,getPost})( FreshPosts);
