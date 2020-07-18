import React, { Component } from 'react';
import {Link } from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Spinner from "../common/Spinner";
import {getCategories} from "../../actions/postAction";
import FreshPosts from "../post/FreshPosts";
import TrendingPosts from "../post/TrendingPosts";
import FeaturedPosts from "../post/FeaturedPosts";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Navbar from "../Layout/Navbar";
import blog from "../../utils/blog.jpg";

 class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
             icon:["cutlery","home","motorcycle","plane"]
        }
    }


    componentDidMount(){
         this.props.getCategories() ;
      }

      
    render() {
        const {categories,loading} = this.props.post;

        let authLinks;

        if(categories.categories === undefined || loading){
          authLinks = <Spinner />
        }else{
        authLinks = (
            <div class="features">
             { categories.categories.map((item,i) => (
                <article>
                <span class="icon"><i class={`fa fa-${this.state.icon[i]}`} aria-hidden="true"></i></span>
                <div class="content">
                    <h3>{item.name} Related Posts</h3>
                    <p>Here are the posts related to the {item.name} content. Want to create {item.name} related posts, Click on Create Post </p>
                    <li><Link class="link" to ={`/new-post/${item._id}/${item.name}`}>Create Post</Link></li>
                </div>
            </article>
             ))}
                </div>
                           
           
        )
         }
        return (

			<div id="wrapper">

					<div id="main">
						<div class="inner">

							
								<Header />
					
								<section id="banner">
									<div class="content">
										<header>
											<h1>Blog App<br />
											using MERN  </h1>
											<p>A free blog aplication site</p>
										</header>
										<p>This is a Blog Application where user can post their favourite posts while selecting the category and display their posts .</p>
										<ul class="actions">
											<li><a href="#" class="button big">Learn More</a></li>
										</ul>
									</div>
								
                                    <span class="image object">
                                    <div id="demo" class="carousel slide" data-ride="carousel">


<ul class="carousel-indicators">
  <li data-target="#demo" data-slide-to="0" class="active"></li>
  <li data-target="#demo" data-slide-to="1"></li>
  <li data-target="#demo" data-slide-to="2"></li>
</ul>

<div class="carousel-inner">
  <div class="carousel-item active">
 
  <img src={blog} alt="" />
  </div>
  <FeaturedPosts />
</div>


<a class="carousel-control-prev" href="#demo" data-slide="prev">
  <span class="carousel-control-prev-icon"></span>
</a>
<a class="carousel-control-next" href="#demo" data-slide="next">
  <span class="carousel-control-next-icon"></span>
</a>
</div>

                                    </span>
								</section>

								<section>
									<header class="major">
										<h2>Post Categories</h2>
									</header>
								
                                    {authLinks}
								</section>

                                <section>
									<header class="major">
										<h2>Trending Posts</h2>
									</header>
                                    <TrendingPosts />
                     </section>
                               

						</div>
					</div>

			
					<div id="sidebar">
						
                        <Navbar />
					</div>

			</div>
        )
    }
}

Dashboard.propTypes = {
    getCategories: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    post: PropTypes.object.isRequired
  }
  
  const mapStateToProps = (state) =>({
    auth: state.auth,
    post : state.post
  })
  
  export default connect(mapStateToProps, {getCategories})(Dashboard);