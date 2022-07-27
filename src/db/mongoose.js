const mongoose = require("mongoose")
const validator = require('validator')

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email:{
    type:String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value){
      if (!validator.isEmail(value)) {
        throw new Error("Email invalid")
      }
    }
  },
  password:{
    type: String,
    required:true,
    trim: true,
    minlength:7,
    validate(value){
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password must not contain word 'password '")
      }
      // if(!validator.isPassword(value)){
      //   throw new Error("Not a valid password")
      // }
    }
  },
  age: {
    type: Number,
    default:0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
});

// const me = new User({
//   name: "Atharva ",
//   email: " AtharvaKutwal@gmail.com",
//   age: 21,
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log("Error : ", error);
//   });

const Tasks = mongoose.model("Tasks", {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
});

// const shopping = new Tasks({
//   description: "shop grocery !",
//   completed: false,
// });

// shopping
//   .save()
//   .then(() => {
//     console.log(shopping);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
