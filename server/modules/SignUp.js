import { Schema, model } from "mongoose";
const userschema = new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true
    },
    secret :{
        type:String,
        required:true
    },
    
},{
    timestamps: true,
});

const User = model('User', userschema);
export default User ;