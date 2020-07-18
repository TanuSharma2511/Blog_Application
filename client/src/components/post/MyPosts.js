import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {myPosts,likePost,unlikePost} from "../../actions/postAction";
import {Link} from "react-router-dom";
import Spinner from "../common/Spinner";
import Header from "../Layout/Header";
import Navbar from "../Layout/Navbar";
import "../../App2.css";

 class MyPosts extends Component {

    componentDidMount(){
         this.props.myPosts()
    }

    

    render() {
        const {myPosts,loading} = this.props.post;
        console.log(myPosts.posts);

        let myPost;

     if(myPosts.posts === undefined || loading){
        myPost = <Spinner />
     }else{
        myPost = (
       <div>
         {myPosts.posts.map(item => (

<section>
<header class="main">
<div class="flex">
  <h1>{item.title}</h1>

  Category: <h4>{item.category.name}</h4>
  </div>
</header>

<span class="image main"><img src={item.imgUrl} alt="" /></span>

<p>{item.description}</p>
<p>{item.description}</p>
<br />

{item.likes.includes(this.props.auth.user.id) ? <button onClick={() =>this.props.unlikePost(item._id)}><i class="fa fa-heart"  aria-hidden="true"></i></button> : <button onClick={() =>this.props.likePost(item._id)}><i class="fa fa-heart-o"  aria-hidden="true"></i></button> } {item.likes.length} likes
<h4>Posted By: </h4>
<div>{item.postedBy.name}</div>
<hr class="major" />
</section>          

            ))}
            </div>
     )
      }
        return (
          <div id="wrapper">

		
					<div id="main">
						<div class="inner">

							
						
                <Header />
                {myPost}

						</div>
					</div>


					<div id="sidebar">
						
            <Navbar />
					</div>
          
			</div>

        )
    }
}

MyPosts.propTypes = { 
    post: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  }
  
  const mapStateToProps = (state) => ({
    post: state.post,
    errors:state.errors,
    auth:state.auth
  })
  
  export default connect(mapStateToProps, {myPosts,likePost,unlikePost})(MyPosts);
  
