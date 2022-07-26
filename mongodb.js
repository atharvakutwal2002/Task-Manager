//CRUD operations

const mongodb= require('mongodb');

const MongoClient= mongodb.MongoClient;

const connectionURL ='mongodb://127.0.0.1:27017';
const databaseName ='task-manager'

MongoClient.connect(connectionURL,{useNewUrlParser : true},(error,client)=>{
      if(error){
        return console.log("Unable to connect");       
      } 
      const db=client.db(databaseName)
    //   db.collection('users').insertOne({
    //     name:"Kunal ",
    //     age :21
    //   },(error,result)=>{
    //       if (error) {
    //         return comsole.log("unable to insert user")
    //       }
    //       console.log(result.ops)
    //   })
    db.collection('users').insertMany([
        {
            name:"Vaishnavi",
            age: 28
        },
        {
            name:"Durgesh",
            age: 19
        }
    ],(error, result)=>{
        if (error) {
           return console.log("Unable to insert ") 
        }
        console.log(result.ops)
    })        
})