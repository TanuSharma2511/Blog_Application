const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      postedBy: {
        type: ObjectId,
        ref: "user",
      },
      description: {
        type: String,
        required: true,
      },
      imgUrl: {
        type: String,
        required: true,
      },
      numOfLikes: {
        type: Number,
        default: 0,
      },
      isFeatured: {
        type: Boolean,
        default: false,
      },
      category: {
        type: ObjectId,
        ref: "category",
      },
    likes:[{type:ObjectId,ref:"user"}],
    comments:[{
        text:String,
        postedBy:{type:ObjectId,ref:"user"}
    }]
   
},{timestamps:true})

module.exports = Post = mongoose.model('post', PostSchema);