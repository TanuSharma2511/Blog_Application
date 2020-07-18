import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {categoryPost} from "../../actions/postAction";
import {Link} from "react-router-dom";
import Spinner from "../common/Spinner";
import Header from "../Layout/Header";
import Navbar from "../Layout/Navbar";
import "../../App2.css";

 class AdventurePost extends Component {

    componentDidMount(){
         this.props.categoryPost(this.props.match.params.id);
    }


    render() {
        const {adventurePosts,loading} = this.props.post;
        console.log(adventurePosts.posts);
        console.log(this.props.match.params.id);

        let allAdventurePosts;

     if(adventurePosts.posts === undefined || loading){
        allAdventurePosts = <Spinner />
     }else{
        allAdventurePosts = (
       <div>
         {adventurePosts.posts.map(item => (

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
                {allAdventurePosts}

						</div>
					</div>


					<div id="sidebar">
						
            <Navbar />
					</div>
          
			</div>
        )
    }
}

AdventurePost.propTypes = { 
    post: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  }
  
  const mapStateToProps = (state) => ({
    post: state.post,
    errors:state.errors
  })
  
  export default connect(mapStateToProps, {categoryPost})(AdventurePost);
  
