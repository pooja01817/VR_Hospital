const mongoose=require('mongoose');

const UserSchema= new mongoose.Schema({
    name: String,
    email:String,
    password:String,
    mobile:Number
});
const UserModel=mongoose.model("username",UserSchema);
module.exports=UserModel;