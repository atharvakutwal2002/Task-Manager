//CRUD operations

// const mongodb= require('mongodb');
// const MongoClient= mongodb.MongoClient;
// const ObjectId= mongodb.ObjectId

const { MongoClient, ObjectID, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id =new ObjectId()
//  console.log(id)
// const id =new ObjectID()
// console.log(id.getTimestamp())

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect");
    }
    const db = client.db(databaseName);
    //   db.collection('users').insertOne({
    //     name:"Atharva ",
    //     age :21
    //   },(error,result)=>{
    //       if (error) {
    //         return console.log("unable to insert user")
    //       }
    //       console.log(result)
    //   })
    // // db.collection('users').insertMany([
    // //     {
    // //         name:"Vaishnavi",
    // //         age: 28
    // //     },
    // //     {
    // //         name:"Durgesh",
    // //         age: 19
    // //     }
    // // ],(error, result)=>{
    // //     if (error) {
    // //        return console.log("Unable to insert ")
    // //     }
    // //     console.log(result.ops)
    // // })

    // db.collection('users').findOne({name:'Kunal'},(error,user)=>{
    //     if (error) {
    //         return console.log("Unable to find user ")
    //     }
    //     console.log(user)
    // })
    // db.collection('users').findOne({name:'Atharva'},{name:1},(error,user)=>{
    //     if (error) {
    //         return console.log("Unable to find user ")
    //     }
    //     console.log(user)
    // })

    // console.log(db.collection('users').findOne({name:'Kunal'}))

    // db.collection('users').find({age: 21}).toArray((error, users)=>{
    //   console.log(users)
    // })
    // db.collection('users').find({age: 21}).count((error, users)=>{
    //   console.log(users)
    // })
    // const updatePromise=db.collection('users').updateOne({
    //   _id: new ObjectID("62e018b391392f949f3b071e")
    // },{
    //   $inc:{
    //     age: -1
    //   }
    // })

    // updatePromise.then((result)=>{console.log(result)}).catch((error)=>{console.log(error)})

    db.collection("users")
      .deleteMany({ name: "Atharva " })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
