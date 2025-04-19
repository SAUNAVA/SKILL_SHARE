import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        default:""
    },
    role:{
        type:String,
        enum: ["Learner" , "Mentor"],
        default:"Learner"
    },
    skillstoLearn:[{
        type:String,
        default:""
    }],
    skillstoTeach:[{
        type:String,
        default:""
    }],
    sessionRequestsSent:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Session"
    }],
    sessionRequestsReceived:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Session"
    }],
    sessionAccepted:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Session"
    }],
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],
    isProfileComplete:{
        type: Boolean,
        default: false
    },
    location:{
        type:String,
        default:""
    },
    availability: {
        type: [
          {
            day: {
              type: String,
              required: false, // Optional
            },
            startTime: {
              type: String,
              required: false, // Optional
            },
            endTime: {
              type: String,
              required: false, // Optional
            },
            _id: false,
          },
        ],
        default: [], // Ensure a default value is set
      },
})

const User = mongoose.model("User" , userSchema);
export default User