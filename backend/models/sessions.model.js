import mongoose from "mongoose";


const mongooseSchema = mongoose.Schema({
    mentor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    learner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    topic:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    note:{
        type: String,
        
    },
    status:{
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
},{
    timestamps: true,
})

const Session = mongoose.model('Session', mongooseSchema)
export default Session