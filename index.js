// npm init : package.json --- This is a Node project.
// npm i express : expressJs package installed.--- project came to know that we are using express

//connect mongodb to our node app
const express = require("express");
const mongoose = require('mongoose');
const  JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport"); 
const User = require("./models/User"); 
require('dotenv').config();  // This line ensures the variables in .env are available to your code

const mongoURI = `mongodb+srv://pruchika142003:${process.env.MONGO_PASSWORD}@cluster0.btcbc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
.then(() => {
    console.log("Connected to Mongo!");
})
.catch((err) => {
    console.log("Error while connected to Mongo!", err);
});

// setup passport-jwt


let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'thisKeyIsSupposedToBeSecret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));





