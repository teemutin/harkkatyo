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
//registers new user from user input
app.post("/api/user/register", async (req,res) => {
    console.log("tehdään käyttäjää")
    try {
        //check if user exists alrdy, stop if does
        let user2 = await User.findOne({name: req.body.name})
        if(user2 != null) {
            res.status(403).json({Name: "Name already in use."})
            console.log("user exists alrdy")
            return
        }
        let hashedPassword = await bcrypt.hash(req.body.password, 10)
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
app.post("/api/user/login", async (req,res) => {
    console.log("kirjaudutaan käyttäjää")
    User.findOne({name: req.body.name}, (err,user) => {
        if(err) {
            console.log(err)
        }
        if(!user) {
            return res.json({msg: "login failed"})
        } else {
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                  const jwtPayload = {
                    id: user._id,
                    username: user.username
                  }
                  jwt.sign(
                    jwtPayload,
                    process.env.SECRET,
                    (err, token) => {
                      res.json({success: true, token});
                    }
                  );
                }
              })
        
            /*
            bcrypt.compare(req.body.password, user.password, {err, isMatch} => {
                if(err) {

                }

                if(isMatch) {
                    const jwtPayload = {
                        id: user._id,
                        name: user.name
                    }
                }
            })
            */
        }
        
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
