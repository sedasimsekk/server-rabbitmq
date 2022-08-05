import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  FirstName: {
    type: String,
    required:true,
  },
  LastName: {
    type: String,
    required:true,
  },
  UserName:  {
    type: String,
    required:true,
    unique:true,
  },
  Email:  {
    type: String,
    required:true,
    unique:true,
  },
  Birthdate: Date,
  Password: {
    type: String,
    required:true,
  },
  Audit: {
    CreationDate : {
       type: Date,
       default: new Date(),
       required:true,
    },
    CreationUser :{
        type: String,
        required:true,
    },
    LastUpdateDate:Date,
    LastUpdateUser:String,
  },
  LastConnectionDate :Date,
});

const User = mongoose.model("Users", userSchema);

export default User;