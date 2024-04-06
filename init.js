//this to initialize some dummy data
const mongoose = require('mongoose');
//const Blog = require("./DbModels/blog.js");
const Chat = require("./DbModels/chat.js");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/iChat');
      //connecting to database
  }
  
  main()
   .then(()=>{console.log("Connected to iChat DataBase")})
   .catch(err => console.log(err));
  

let allChats=[
    {
        from:"tony",
        to : "bruce",
        message :"Love you 3000",
        created_at : new Date(),
    },
    {
        from:"bruce",
        to : "peter",
        message :"Hulk will smash u",
        created_at : new Date(),
    },
    {
        from:"captain",
        to : "thor",
        message :"give me the hammer",
        created_at : new Date(),
    },
    {
        from:"captain marvel",
        to : "loki",
        message :"Hey lookie! god of mischief",
        created_at : new Date(),
    },
    {
        from:"Srijit",
        to : "Rana",
        message :"marvel dekhte jbi?",
        created_at : new Date(),
    },
    {
        from:"Rana",
        to : "Bag",
        message :"MunMun di r kchwa jbo",
        created_at : new Date(),
    },
    {
        from:"Debjit",
        to : "Srijit",
        message :"Mini khelte aso",
        created_at : new Date(),
    }
]

Chat.insertMany(allChats)
 .then((res)=>{
    console.log(res);
 })

// let allBlogs=[
//     {
//             title:"modi sarkar",
//             author : "Srijit Debsarma",
//             text :"abki bar 400 par",
//             created_at : new Date(),
//             likes: 10,
//         },
//         {
//             title:"mamata sarkar",
//             author : "Srijit Debsarma",
//             text :"tmc vhor",
//             created_at : new Date(),
//             likes: 10,
//         }
//     ];
// Blog.insertMany(allBlogs);