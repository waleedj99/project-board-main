const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
var cors = require('cors');
const mongo = require("mongodb").MongoClient
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
const mongourl = "mongodb+srv://waleed:wal40250@cluster0-rlbi7.mongodb.net/test?retryWrites=true&w=majority"

//let userEmail = "waleedj1699@gmail.com"
app.post('/home', function (req, res) {
  //let a=[{name:"apple",price:"5"},{name:"orange",price:"10"}] 
  mongo.connect(mongourl,(err,client)=>{
    var db = client.db('ProjectDB')
    var collection = db.collection('BoardsData')
    let a = []
    console.log(req.body.createdby)
    collection.find({createdby:req.body.createdby}).toArray(function (err, docs) { 
        if (err) return res.status(500).send({error: err})
        res.send(docs)
    })  
    client.close()
  })
});

app.post('/signup', function (req, res) {
  mongo.connect(mongourl,(err,client)=>{
    var db = client.db('ProjectDB')
    var collection = db.collection('LoginData')
      collection.insertOne(req.body)
    client.close()
  })
  console.log("Aa")
  console.log(req.body)
  res.send(200)
});


app.post('/createboard', function (req, res) {
  mongo.connect(mongourl,(err,client)=>{
    var db = client.db('ProjectDB')
    var collection = db.collection('BoardsData')
      collection.insertOne(req.body)
    client.close()
  })
  res.sendStatus(200)
});


app.post('/deleteboard', function (req, res) {
  mongo.connect(mongourl,(err,client)=>{
    var db = client.db('ProjectDB')
    var collection = db.collection('BoardsData')
    collection.remove(req.body)
    client.close()
  })
  res.sendStatus(200)
});


app.post('/createlist', function (req, res) {
  mongo.connect(mongourl,(err,client)=>{
    var db = client.db('ProjectDB')
    var collection = db.collection('BoardsData')
    collection.updateOne({name:req.body.b_name,createdby:req.body.createdby},{$set:{l_json:req.body.l_json}},true)
    console.log(req.body.l_json)
    client.close()
  })
  res.send({a:'aa'})
});

app.post('/deletelist', function (req, res) {
  mongo.connect(mongourl,(err,client)=>{
    var db = client.db('ProjectDB')
    var collection = db.collection('BoardsData')
    collection.updateOne({name:req.body.b_name,createdby:req.body.createdby},{$pull:{l_json:req.body.l_json[0]}})
    console.log(req.body.l_json)
    client.close()
  })
  res.send({a:'aa'})
});


app.post('/savecard', function (req, res) {
  mongo.connect(mongourl, {poolSize: 10},(err,client)=>{
    var db = client.db('ProjectDB')
    var collection = db.collection('BoardsData')
    console.log(req.body.l_json)
    collection.findOne({name:req.body.b_name,createdby:req.body.createdby},(err,res)=>{
      res.l_json.forEach((element,index) => {
        //console.log(req.body)
        if(element.listname==req.body.l_name){
          console.log(req.body.c_json)      
          collection.updateOne({name:req.body.b_name,createdby:req.body.createdby},
            {$set:{name:req.body.b_name,createdby:req.body.createdby,["l_json."+ index+".c_json"]:req.body.c_json}},false,()=>{
            client.close()
            
          })
            
            }
      });
    })
    
    
    // collection.findOne({name:req.body.b_name,createdby:req.body.createdby},(err,res)=>{
    //   console.log(req.body.l_json)
    // })
    
  })
  res.send({a:'aa'})
});




app.post('/createcard', function (req, res) {
  mongo.connect(mongourl, {poolSize: 10},(err,client)=>{
    var db = client.db('ProjectDB')
    var collection = db.collection('BoardsData')
    collection.findOne({name:req.body.b_name,createdby:req.body.createdby},(err,res)=>{
      res.l_json.forEach((element,index) => {
        //console.log(req.body)
        if(element.listname==req.body.l_name){
          console.log(req.body.c_json)      
              collection.updateOne({name:req.body.b_name,createdby:req.body.createdby},{$set:{["l_json."+ index+".c_json"]:req.body.c_json}},false,()=>{
                client.close()
                //console.log('updated')
              })
            
            }
      });
    })
  })
  res.send({a:'aa'})
});


app.post('/deletecard', function (req, res) {
  mongo.connect(mongourl, {poolSize: 10},(err,client)=>{
    var db = client.db('ProjectDB')
    var collection = db.collection('BoardsData')
    //console.log(req.body.b_name)
    collection.findOne({name:req.body.b_name,createdby:req.body.createdby},(err,res)=>{
      //console.log(res)
      res.l_json.forEach((element,index) => {
        //console.log(req.body.l_name,element.listname)
        if(element.listname==req.body.l_name){
            // console.log("bru")
              collection.updateOne({name:req.body.b_name,createdby:req.body.createdby},{$pull:{["l_json."+index+".c_json"]:{cardname:req.body.c_name,id:req.body.c_id}}},()=>{
                //console.log("bruh")
                client.close()
              })
            
            }
      });
    })
  })
  res.send({a:'aa'})
});


app.post('/login',(req,res)=>{
  mongo.connect(mongourl, (err, client) => {
    if (err) {
        console.error(err)
        return
    }
    userEmail = req.body.userEmail
    var db = client.db('ProjectDB')
    var collection = db.collection('LoginData')
    collection.findOne({ "userEmail": req.body.userEmail }, (err, item) => {
      if(item!=null){
          if (item.userPass == req.body.userPass){
              res.send({message:true})//Send to Homepage
              console.log("success")
          }
          else{
            console.log("no success")
            res.send({message:false})//Send message in a proper manner 
          }
      }
      else{
        console.log("no success")
        res.send({message:false})
      } 
  })
  client.close();
})  

})
app.listen(process.env.PORT || 8000);
