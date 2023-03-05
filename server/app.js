require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const mongoDB = "mongodb://127.0.0.1:27017/project";
const Post = require("./models/Posts");
const User = require("./models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//setting database connection
mongoose.set("strictQuery", false);
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB error"));

app.get("/api/hello", (req,res) => {
    console.log("päivää")
    res.send("Päivää")
});

//takes post data, header, and author 
//and creates db entry from post model and saves it in db
app.post("/api/post", async (req,res) => {
    console.log("tehdään postia")
    console.log(req.body)
    
   
    const post = new Post ({
        author: req.body.author,
        header: req.body.header,
        post: req.body.post
    })
    try {
        post.save()
        res.json({response: "ok"})
    } catch (err) {
        console.log(err)
        res.send(err)
    }
        

})
//takes comment and header
//finds correct post and updates the comment array 
app.post("/api/post/comment", async (req,res) => {
    console.log("tehdään kommenttia")
    console.log(req.body.post)
    console.log(req.body.header)
    try {
        await Post.updateOne({header: req.body.header}, { $push: {comments: req.body.post}})
        Post.findOne({header: req.body.header})
        .then((result) => {
            console.log("yksi: "+result)
        })

        res.json({response: "ok"})
    } catch (err) {
        console.log(err)
        res.send(err)
    }
        

})

//registers new user from user input, saves it in db
//takes in name, and password. hashes pw with bcrypt
app.post("/api/user/register", async (req,res) => {
    console.log("tehdään käyttäjää")
    try {
        //check if name for user exists alrdy, stop if does
        let user2 = await User.findOne({name: req.body.name})
        if(user2 != null) {
            res.status(403).json({Name: "Name already in use."})
            console.log("user exists alrdy")
            return
        }
        //hash the password with bcrypt
        let hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(hashedPassword)
        //create new db index and save it
        const user = new User ({
            name: req.body.name,
            password: hashedPassword
        })
        console.log("uusi käyttäjä " + user)
        user.save()
        res.json("Registration succesful")
        
    } catch(err) {
        console.log(err)
        res.send(err)
    }

});
//verifies user login
//takes in name and password and checks if they match ones is db
app.post("/api/user/login", async (req,res) => {
    console.log("kirjaudutaan käyttäjää")
    console.log(req.body)
    //search db for matching name
    let user = await User.findOne({name: req.body.name})
        if(!user) {
            return res.json({msg: "login failed"})
        } else {
            //check if hashed passwords match
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if(err) {
                    console.log("no match/error" + err)
                    res.json({fail: "error"});
                }
                //jwt is sent if succesful
                if(isMatch) {
                  const jwtPayload = {
                    name: user.name
                  }
                  const accessToken = jwt.sign(
                    jwtPayload,
                    process.env.SECRET
                  );
                  console.log("login succesful")
                  res.json({accessToken})
                  
                }
                if(!isMatch) {
                    console.log("wrong password")
                    res.json({fail: "wrong password"});
                }
              })
        
        }
})

//fetch all posts from db
app.get("/api/allposts", async (req,res) => {
    Post.find()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    })
});
//fetch one post from db using params
//takes in header
app.post('/api/post/:header', async (req,res) => {
    console.log("Tätä kutsuttiin")
    console.log(req.body)
    
    Post.findOne({header: req.body.header})
    .then((result) => {
        console.log(result)
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    })
    
})

//setting cors options, so we can connect to server from client on dev env
if (process.env.NODE_ENV === "development") {
    var corsOptions = {
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions))
}

module.exports = app;
