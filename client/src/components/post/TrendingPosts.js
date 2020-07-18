import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getTrendingPosts,getPost} from "../../actions/postAction";
import {Link} from "react-router-dom";
import Spinner from "../common/Spinner";
import "../../App2.css";

 class TrendingPosts extends Component {

    componentDidMount(){
        this.props.getTrendingPosts();
    }

   
    render() {
        const {trendingPosts,loading} = this.props.post;
        console.log(trendingPosts.posts);

        let trendingPost ;

        if(trendingPosts.posts === undefined || loading){
            trendingPost = <Spinner />
          }else{
              trendingPost = (
                <div class="posts">
                      {trendingPosts.posts.map(item => (
              
                    <article>
											<a href="#" class="image"><img src={item.imgUrl} alt="" /></a>
											<h3>{item.title}</h3>
											<p>Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.</p>
											<ul class="actions">
												<li onClick={() => this.props.getPost(item._id)}> <Link class="link" to={`/single/${item._id}`}>View Post</Link></li>
											</ul>
										</article>
                  
                      ))}
                  </div>
              )
          }
    
        return (
          <div>
            {trendingPost}
          </div>
          )
    }
}

TrendingPosts.propTypes = { 
    post: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }
  
  const mapStateToProps = (state) => ({
    post: state.post,
    errors:state.errors
  })
  
  export default connect(mapStateToProps, {getTrendingPosts,getPost})(TrendingPosts);