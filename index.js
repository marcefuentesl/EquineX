const mongo = require('mongodb');
const bodyParser= require('body-parser');
const express = require('express');
const path = require('path');


const app = express();

const port = 3000;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbAdmin:AveryLongPassword@cluster0.vnoxe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/Img'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

//TODO login
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', (req, res) => {

  client.connect(err => {
    const collection = client.db("Equinex").collection("Users");
    collection.findOne({ username: req.body.username}, function(err, user) {
      console.log('User found ');
      // In case the user not found   
      if(err) {
        console.log('No user found');
        // client.close();
        return res.sendFile(__dirname + '/public/errorpage.html');
      } 
      if (user && user.password === req.body.password){
        console.log('User and password is correct');
        // client.close();
        return res.sendFile(__dirname + '/public/mainpage.html');
      } else {
        console.log("Credentials wrong");
        // client.close();
        return res.sendFile(__dirname + '/public/errorpage.html');
      }              
    });    
  });
});


app.get('/mainpage', (req, res) => {
  res.sendFile(__dirname + '/public/mainpage.html');
});
  // res.send(`Username: ${username} Password: ${password}`);

//TODO Find by given name
app.post('/find', function(req, res) {
  client.connect(err => {
    var collection;
    var us;
    console.log(req.body.nomjin);
    if(req.body.nomjin === null){
      us = req.body.nomcab;
      collection = client.db("Equinex").collection("Caballos");
    }
    else{
      us = req.body.nomjin;
      console.log(us);
      collection = client.db("Equinex").collection("User");
    }
    collection.findOne({ username: us}, function(err, user) {
      if (err) 
      {

        return res.sendFile("/public/errorpage.html");
      }
      if(user){
        console.log(result);
        res.json(result);

      }
      // client.close();
      console.log("nah");
    });
    console.log("success");
  });
});

//register directions
app.get('/register', (res) => {
  res.sendFile(__dirname + '/public/register.html');
})
app.post('/register', (req, res) => {
  client.connect(err => {
    const collection = client.db("Equinex").collection("Users");
    collection.insertOne(req.body, function(err, res) {
      if(err) {
        console.log('No user found');
        // client.close();
        return res.sendFile(__dirname + '/public/errorpage.html');
      } 
      console.log("1 document inserted");
      client.close();
    });
    console.log("success");
  });
  return res.sendFile(__dirname + '/public/success.html');
});
//register caballos to specific collections
app.get('/registercaballo', (res) => {
  res.sendFile(__dirname + '/public/registercaballo.html');
})
app.post('/registercaballo', (req, res) => {
  client.connect(err => {
    const collection = client.db("Equinex").collection("Caballos");
    collection.insertOne(req.body, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      // client.close();
    });
    console.log("success");
  });
  res.sendFile(__dirname + '/public/mainpage.html');
});

//delete caballo from collection
app.post('/deletecaballo', (req, res) => {
  // var myquery = { address: 'Mountain 21' };
  client.connect(err => {
    const collection = client.db("Equinex").collection("Caballos");
    collection.deleteOne(req.body, function(err, res) {
      if(err) {
        // client.close();
        return res.sendFile(__dirname + '/public/errorpage.html');
      } 
      console.log("1 document inserted");
      // client.close();
    });
    console.log("success");
  });
  res.sendFile(__dirname + '/public/mainpage.html');
});

// update value of a horse 
app.post('/updatecaballo', (req, res) => {
  // var myquery = { address: 'Mountain 21' };
  client.connect(err => {
    const collection = client.db("Equinex").collection("Caballos");
    collection.updateOne({ horseID: req.body.horseID}, { $set: {name: req.body.name} },function(err, res) {
      if(err) {
        // client.close();
        res.sendFile(__dirname + '/public/errorpage.html');
      } 
      console.log("1 document inserted");
      // client.close();
    });
    console.log("success");
  });
  res.sendFile(__dirname + '/public/mainpage.html');
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});