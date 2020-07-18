import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getPost} from "../../actions/postAction";
import {Link} from "react-router-dom";
import Spinner from "../common/Spinner";
import Header from "../Layout/Header";
import Navbar from "../Layout/Navbar";
import Single from "./Single";
import "../../App.css";

 class SinglePost extends Component {
    componentDidMount(){
        if(this.props.match.params.id){
           this.props.getPost(this.props.match.params.id);
        }
    }  
    render() {
        const {post,loading} = this.props.post;
        console.log(post);

        let singlePost;

        if(post === null || loading){
            singlePost = <Spinner />
         }else{
        singlePost = (
            <div>
               {post.map(item => {
               return <Single single={item} />
                })} 
            </div>
        )
            }
        
      
        return (
            <div id="wrapper">

		
            <div id="main">
                <div class="inner">

                    
                
        <Header />
        {singlePost}

                </div>
            </div>


            <div id="sidebar">
                
    <Navbar />
            </div>
  
    </div>

        )
    }
}


SinglePost.propTypes = { 
    post: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  }
  
  const mapStateToProps = (state) => ({
    post: state.post,
    errors:state.errors
  })
  
  export default connect(mapStateToProps, {getPost})(SinglePost);
  
