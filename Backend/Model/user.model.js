import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    
firstname:{
    type: String,
    required: [true,'Provide First Name'],
    minLength: [5,"First Name should have atleast 5 chars"],
},
lastname:{
type: String,
required: [true,'Provide First Name'],
minLength: [5,"Last Name should have atleast 5 chars"],
},
username:{
type: String,
required: [true,"Provide Username"],
unique:true
},
password:{
type: String,
required: [true,"Provide Password"],
},
email:{
type: String,
required: [true,"Provide Email"],
},
phoneNumber:{
type: String,
required: [true,"Provide PhonNumber"],
},
roles:{
type: String,
default: "customer",
enum:["customer","moderator","admin"]
},
avatar:{
type: String,    
}
})

export default mongoose.model("user",userSchema)