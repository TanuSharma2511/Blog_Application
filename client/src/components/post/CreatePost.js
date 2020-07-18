import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createPost} from "../../actions/postAction";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import "../../App.css";

 class CreatePost extends Component {
  constructor(){
    super();
    this.state = {
        title : "",
        description : "",
        image : "",
        numOfLikes : 0,
        isFeatured: false,
        category: "",
        errors : {},
        url: "",
        picError: ""
    }
}

componentDidMount(){
  this.setState({category: this.props.match.params.item});
 
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
  const data = new FormData()
  data.append("file",this.state.image)
  data.append("upload_preset","blog-pic")
  data.append("cloud_name","ts8844")
  fetch("https://api.cloudinary.com/v1_1/ts8844/image/upload",{
      method:"post",
      body:data
  })
  .then(res=>res.json())
  .then(data=>{
    //  setUrl(data.url)
     this.setState({url : data.url});
     if(this.state.url){
      const postData={
        title:this.state.title,
        description:this.state.description,
        imgUrl:this.state.url,
        isFeatured:this.state.isFeatured,
        category:this.state.category,
    }
    this.props.createPost(postData);
  
    }
    this.setState({image:"",url:"",imgUrl : "",title:"",description:""});
    alert("Post Created");
  })
  .catch(err=>{
      console.log(err)
  })
   
   
}

    render() {
      const {errors} = this.state;
      console.log(this.props.match.params.item,this.props.match.params.name);
        return (
<div>
<Link class="link" style={{marginRight:"10px",marginTop:"10px"}} to ="/">Go Back To Home Page</Link>
  <div class="wrapper">
    
        <div class="container">

<div class="sign_up">
<form class="form" onSubmit={this.onSubmit}>
<div class="input_field">
<label for="title">Title</label>
             <input
              type="text"
              id="title"
              name="title"
              class="form-control"
              placeholder="Enter Title for Post"
              value={this.state.title}
              onChange={this.onChange}
              error = {errors.title}
            />
             {errors.title? <div style={{color:"red"}}>{errors.title}</div> : null}  
             </div>
             <div class="input_field">
             <label for="description">Description</label>
           <textarea
              type="text"
              id="description"
              name="description"
              class="form-control"
              placeholder="Enter description"
              value={this.state.description}
              onChange={this.onChange}
              error = {errors.description}
            />
             {errors.description? <div style={{color:"red"}}>{errors.description}</div> : null}  
  </div>
  <div class="input_field">
  <label for="isFeatured">isFeatured</label>
            <input
              type="isFeatured"
              id="isFeatured"
              name="isFeatured"
              class="form-control"
              placeholder="If isFeatured ? Write True else False"
              error = {errors.isFeatured}
              value={this.state.isFeatured}
              onChange={this.onChange}
            />
          
  </div>
  <div>
  <label for="category">Upload Image</label>
          <div className="btn #64b5f6 blue darken-1">
               <input type="file" onChange={(e)=>this.setState({image : e.target.files[0]})} />
               {this.state.picError? <div style={{color:"red"}}>{this.state.picError}</div> : null}
             </div>
             </div>
  <button type="submit" class="btn btn-block auth">Create Post</button>
 </form>
 
</div>



</div>
</div>
</div>
 
        )
    }
}

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  errors:state.errors
})

export default connect(mapStateToProps, {createPost})(withRouter(CreatePost));

