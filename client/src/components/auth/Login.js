import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loginUser} from "../../actions/authAction";
import {Link} from "react-router-dom";
import "../../App.css";

 class Login extends Component {
  constructor(){
    super();
    this.state = {
         email:"",
         password:'',
         errors:{}
    }
}

componentDidMount(){
  if(this.props.auth.isAuthenticated){
    this.props.history.push("/");
  }
}

componentWillReceiveProps(nextProps){
 if(nextProps.auth.isAuthenticated){
   this.props.history.push("/");
 }

  if(nextProps.errors){
    this.setState({errors: nextProps.errors});
  }
}

onChange = (e) =>{
    this.setState({[e.target.name]: e.target.value });
}
onSubmit = (e) =>{
    e.preventDefault();
    const userData={
        email:this.state.email,
        password:this.state.password,
    }
    this.props.loginUser(userData);
}
    render() {
      const {errors} = this.state;
        return (
  <div class="wrapper">
        <div class="container">
  <div class="tabs">
  <ul>
    <li class="sign_in_li"><a href="login">Sign in</a></li>
    <li class="sign_up_li"><a href="register">Sign up</a></li>

  </ul>
</div>

<div class="sign_up">
<form class="form" onSubmit={this.onSubmit}>
  <div class="input_field">
  <label for="email">Email:</label>
  <input
              type="email"
              id="email"
              name="email"
              class="form-control"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={this.onChange}
              error = {errors.email}
            />
      {errors.email? <div style={{color:"red"}}>{errors.email}</div> : null}      
  </div>
  <div class="input_field">
  <label for="password">Password:</label>
  <input
              type="password"
              id="password"
              name="password"
              class="form-control"
              placeholder="Enter Password"
              value={this.state.password}
              onChange={this.onChange}
              error = {errors.password}
            />
      {errors.password? <div style={{color:"red"}}>{errors.password}</div> : null}
  </div>
  <button type="submit" class="btn btn-block auth">Sign In</button>
 </form>
  <p class="lead mt-4">
          No Account?  <Link to ="/register">Sign Up</Link>
      </p>
    
</div>



</div>
</div>

        )
    }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors:state.errors
})

export default connect(mapStateToProps, {loginUser})( Login);
