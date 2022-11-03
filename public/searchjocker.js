const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://A01654203:ql8DjfgC6B03EXba@cluster0.teqbbtq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

document.getElementById("jsearch").onclick = function ()
{
    client.connect(err => {
      const collection = client.db("Equinex").collection("User");
      collection.findOne({ username: req.body.username}, function(err, user) {
          // In case the user not found   
          if(user == null)
          {
            console.log("[-] Invalid user")
            return res.sendFile(__dirname + '/public/errorpage.html')
          }
    
          console.log('[+] User found...');
          console.log(user)
    
          if(err) {
            console.log(err);
            console.log("[-] Invalid user or null")
            // client.close();
            return res.sendFile(__dirname + '/public/errorpage.html');
          } 
          
        });    
      });

      client.close();
}