const express= require(`express`);
const app=express();

const Chat = require("./DbModels/chat.js"); //requiring it for DB

// const Blog = require("./DbModels/blog.js"); //requiring it for DB


// getting-started.js
const mongoose = require('mongoose');

//method override
const methodOverride = require("method-override");


const path=require("path"); //for ejs views
app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "public")));    //staic files will be served from public folder

//to parse post request data
app.use(express.urlencoded({extended:true}));

//method override middleware
app.use(methodOverride("_method"));


//Error Handling
const ExpressError=require("./ExpressError");


//Error Handling middleWare
app.use((err,req,res,next)=>{
    console.log(err);
    let {statusCode=501,message="Euh! Error!!!"}= err;
    res.send(message);
})




async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/iChat');
 // await mongoose.connect('mongodb://127.0.0.1:27017/blog');
    //connecting to database
}

main();

app.listen(8080, ()=>{
    console.log("Website live at : 8080");
})


//routing

//show all the chats
app.get("/chats", async (req,res)=>{
    let chats = await Chat.find();   //it will return all the data from db
    //console.log(chats);
    res.render("index.ejs",{chats});
})

//add a new chat-form opening
app.get("/chats/new", (req,res)=>{
        //throw new ExpressError(404, "Page not found");
        res.render("addMessage.ejs");
})
//add a new chat-adding to database -post request sends some data to database
app.post("/chats/new", async (req,res,next)=>{



    //###########**********########### TRY_CATCH BLOCK FOR ASYNC ERRORS ********************





    
try{
    let {from,to,message}=req.body; //got the user given data
    let newMessage= new Chat({
        from: from,
        message: message,
        to: to,
        created_at:new Date(),
    });
    //database a add kora function then able then ota tew await use korte hba
    await newMessage.save();  //add it into database
    //  .then((res)=>{
    //     console.log(res);
    //  })
    res.redirect("/chats");
}catch(err){
    next(err);
}
       
})



//Update Route - Edit a message form
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}= req.params;
    let chat=await Chat.findById(id);   //searching chat in basic of ID from DB
    res.render("edit.ejs",{chat});  //send the prev chat to edit form
})
//Update Route - it will be a PUT request
app.put("/chats/:id",async (req,res)=>{
    let { id }=req.params;
    let {message:newMessage} = req.body;    //message came and it renamed to newMessage
    let updatedChat= await Chat.findByIdAndUpdate(id, {message:newMessage});
    res.redirect("/chats"); 
})

//Destroy Route
app.delete("/chats/:id", async (req,res)=>{
    let{id}=req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats"); 
})




















// main()
// //  .then(()=>{console.log("Connected to iChat DataBase")})
// .then(()=>{console.log("Connected to blog DataBase")})
//  .catch(err => console.log(err));

// app.listen(5050, ()=>{
//     console.log("Website live at: 5050");
// })

// //routings

// //show all the blogs
// app.get("/blogs", async(req,res)=>{
//     let blogs= await Blog.find();   // it will return all the blogs
//     res.render("landingPage.ejs",{blogs});
// })

// //add a new blog-form opening
// app.get("/blogs/new", (req,res)=>{
//     res.render("writeABlog.ejs");
// })
// //add a new blog-adding to database -post request sends some data to database
// app.post("/blogs/new", (req,res)=>{
//     let {author,title,text,image,}=req.body; //got the user given data
//     let newBlog= new Blog({
//         author: author,
//         title: title,
//         text: text,
//         image:image,
//         created_at:new Date(),
//     });
//     //database a add kora function then able then ota tew await use korte hba
//     newBlog.save();  //add it into database
//     //  .then((res)=>{
//     //     console.log(res);
//     //  })
//     res.redirect("/blogs");
// })
