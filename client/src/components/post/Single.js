import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {likePost,unlikePost,getPosts} from "../../actions/postAction";
import {Link} from "react-router-dom";
import "../../App2.css";

class Single extends Component {
  componentDidMount(){
    this.props.getPosts();
  }
    render() {
        const {single} = this.props;
        console.log(single);
        return (
            
          <section>
          <header class="main">
          <div class="flex">
            <h1>{single.title}</h1>
         
            Category: <h4>{single.category.name}</h4>
            </div>
          </header>
          
          <span class="image main"><img src={single.imgUrl} alt="" /></span>
        
          <p>{single.description}</p>
          <p>{single.description}</p>
          <br />
          
          {single.likes.includes(this.props.auth.user.id) ? <button onClick={() =>this.props.unlikePost(single._id)}><i class="fa fa-heart"  aria-hidden="true"></i></button> : <button onClick={() =>this.props.likePost(single._id)}><i class="fa fa-heart-o"  aria-hidden="true"></i></button> } {single.likes.length} likes
          <h4>Posted By: </h4>
          <div>{single.postedBy.name}</div>
          <hr class="major" />
</section>          


        )
    }
}

Single.propTypes = { 
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  post: state.post,
  errors:state.errors,
  auth: state.auth
})

export default connect(mapStateToProps, {likePost,unlikePost,getPosts})(Single);
