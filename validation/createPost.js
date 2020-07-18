const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCreatePost(data){
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : "";
    data.description = !isEmpty(data.description) ? data.description : "";

    if(validator.isEmpty(data.title)){
        errors.title = 'Title Field is required';
     }

     if(validator.isEmpty(data.description)){
        errors.description = 'Description Field is required';
     }

     if(validator.isEmpty(data.imgUrl)){
        errors.imgUrl = 'imgUrl Field is required';
     }

    return{
        errors,
        isValid:isEmpty(errors)
    }
}