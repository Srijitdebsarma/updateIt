const mongoose = require('mongoose');

const blogSchema= new mongoose.Schema({
    title:{
        type : String,
        required :true,
        maxLength : 100,
    },
    author: {
        type : String,
        required: true,
    },
    text: {
        type : String,
        required: true,
    },
    image: {
        type : String,
    },
    created_at: {
        type : Date,
        required: true,
    },
    likes:{
        type: Number,
    },
})

const Blog= mongoose.model("Blog", blogSchema); //for creating a Blog Collection/table

module.exports=Blog;    //to acess this schema from index.js