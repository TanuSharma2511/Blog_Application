import React, { Component } from 'react';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {registerUser} from "../../actions/authAction";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import "../../App.css";

class Register extends Component {
  constructor(){
    super();
    this.state = {
         name:'',
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
  if(nextProps.errors){
    this.setState({errors: nextProps.errors});
  }
}

onChange = (e) =>{
    this.setState({[e.target.name]: e.target.value });
}

onSubmit = (e) =>{
    e.preventDefault();
    const newUser={
        name:this.state.name,
        email:this.state.email,
        password:this.state.password,
    }

   this.props.registerUser(newUser, this.props.history);
}

    render() {
      const {errors} = this.props;
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
             <label for="name">Name:</label>
             <input
              type="name"
              id="name"
              name="name"
              class="form-control"
              placeholder="Enter Name"
              value={this.state.name}
              onChange={this.onChange}
              error = {errors.name}
            />
            {errors.name? <div style={{color:"red"}}>{errors.name}</div> : null} 
          </div>
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
  <button type="submit" class="btn btn-block auth">Sign Up</button>
 </form>
  <p class="lead mt-4">
          Already have an account?  <Link to ="/login">Sign In</Link>
      </p>
</div>



</div>
</div>

        )
    }
}

Register.propTypes ={
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) =>({
   auth:state.auth,
   errors:state.errors
})

export default connect(mapStateToProps, {registerUser})(withRouter(Register));

