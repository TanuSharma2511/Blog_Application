import React, { Component } from 'react';
import {Link } from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authAction";
import Spinner from "../common/Spinner";
import FreshPosts from "../post/FreshPosts";
import {getCategories,getPosts} from "../../actions/postAction";
import "../../App2.css";


class Navbar extends Component {

  componentDidMount(){
    this.props.auth.isAuthenticated && this.props.getCategories() ;
    this.props.auth.isAuthenticated && this.props.getPosts() ;
  }

  onLogoutClick(e){
    e.preventDefault();
    this.props.logoutUser();
  }
    render() {

     const {isAuthenticated,user} = this.props.auth;
     const {categories,loading} = this.props.post;
     console.log(categories.categories);

     let authLinks;

     if(categories.categories === undefined || loading){
       authLinks = <Spinner />
     }else{
     authLinks = (
   
						<div class="inner">
								<section id="search" class="alt">
									<form method="post" action="#">
										<input type="text" name="query" id="query" placeholder="Search" />
									</form>
								</section>

						
								<nav id="menu">
									<header class="major">
										<h2>Menu</h2>
									</header>
									<ul>
										<li><Link to="/">Homepage</Link></li>
										<li><Link to ="all-post">All Posts</Link></li>
										
                     { categories.categories.map((item,i) => (
            <li class="drop-link">
            <Link to ={`/post/${item.name}/${item._id}`}>{item.name} 
           </Link>
            </li>
        ))
    }
    	<li><Link to ="my-post">My Posts</Link></li>
      <li><a href="#" onClick={this.onLogoutClick.bind(this)} ><Link to="/login">Logout</Link></a></li>
      <br/>

									</ul>
								</nav>

							
								<section>
									<header class="major">
										<h2>Fresh Stories</h2>
									</header>
								
                    <FreshPosts />
								
									<ul class="actions">
										<li><a href="#" class="button">More</a></li>
									</ul>
								</section>

					
								<section>
									<header class="major">
										<h2>Get in touch</h2>
									</header>
									<p>Sed varius enim lorem ullamcorper dolore aliquam aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin sed aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.</p>
									<br/>
                  <ul class="contact">
										<li class="icon2 "><i class="fa fa-envelope" aria-hidden="true"></i><a href="#">information@untitled.tld</a></li>
										<li class="icon2 "><i class="fa fa-phone" aria-hidden="true"></i>(000) 000-0000</li>
										<li class="icon2 "><i class="fa fa-home" aria-hidden="true"></i>1234 Somewhere Road #8254<br />
										Nashville, TN 00000-0000</li>
									</ul>
								</section>
                <footer id="footer">
									<p class="copyright">&copy; Untitled. All rights reserved. Demo Images: <a href="https://unsplash.com">Unsplash</a>. Design: <a href="https://html5up.net">HTML5 UP</a>.</p>
								</footer>
        </div>
        
     )
      }
      
     const guestLinks = (
        <ul className="navbar-nav m-auto">
          <li class="drop-link">
								<a class="active" href="index.html">Home <i class="fa fa-angle-down" aria-hidden="true"></i></a>
								<ul class="dropdown">
									<li><a href="index.html">Homepage 01</a></li>
									<li><a href="home2.html">Homepage 02</a></li>
								</ul>
                </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            
          </ul>
     )

        return (
          <>

         <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
         
          {isAuthenticated ? authLinks : guestLinks}  
          <ul className="navbar-nav ml-auto social-list">
            <li>
             
            </li>
            <li>
              
            </li>
            <li>
              
            </li>
          </ul>
        </div>
      </div>
    </nav>

 
          </>
             )
    }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
  auth: state.auth,
  post : state.post
})

export default connect(mapStateToProps, {logoutUser,getCategories,getPosts})(Navbar);
