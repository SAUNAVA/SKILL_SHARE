import mongoose from 'mongoose';


const requestSchema = mongoose.Schema({
    mentorId:{
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
        // required: true,
    }
       
}, {
    timestamps: true,
});

const Request = mongoose.model('Request', requestSchema);
export default Request;