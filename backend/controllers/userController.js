import Session from "../models/sessions.model.js"
import User from "../models/user.model.js"

export const getProfile = async(req,res)=>{
    try {
        res.status(200).json({user:req.user})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}


// controllers/userController.js

export const updateProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id); // from auth middleware
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const {
        name,
        bio,
        skillstoLearn,
        skillstoTeach,
        location,
        availability,
        role,
      } = req.body;
  
      // Update fields
      user.name = name || user.name;
      user.bio = bio || user.bio;
      user.skillstoLearn = skillstoLearn || user.skillstoLearn;
      user.skillstoTeach = skillstoTeach || user.skillstoTeach;
      user.location = location || user.location;
      user.availability = availability || user.availability;
      user.role = role || user.role;
  
      // Check if all required fields are now filled
      const isComplete =
        user.name &&
        user.bio &&
        user.skillstoLearn?.length > 0 &&
        user.skillstoTeach?.length >0 &&
        user.location &&
        user.availability &&
        user.role;
  
      user.isProfileComplete = !!isComplete;
  
      const updatedUser = await user.save();
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error updating profile' });
    }
  };
  

  export const getMentors = async(req,res)=>{
    try {
      const mentors = await User.find({role:"Mentor"}).select("-password")
      res.json(mentors)
    } catch (error) {
      console.error(error.message)
      res.status(500).json({message:"Failed to fetch mentors"})
    }
  }

  export const getMentorById = async(req,res)=>{
    try {
      const mentor = await User.findById(req.params.id).select("-password")
      if(!mentor){
        return res.status(404).json({message:"Mentor not found"})
      }
      res.json(mentor)
    } catch (error) {
      res.status(500).json({message:"Failed to fetch mentor"})
      console.error(error.message)
    }
  }

  export const sessionRequest = async(req,res)=>{
    const{mentorId, topic , date , note} = req.body
    try {
      const session = await Session.create({
        mentor:mentorId,
        learner:req.user._id,
        topic,
        date,
        note,
        status:'pending'
      })
      await User.findByIdAndUpdate(req.user._id, { $push: { sessionRequestsSent: session._id } });
      res.status(201).json(session)
    } catch (error) {
      console.error(error.message)
      res.status(500).json({message:"Failed to create session"})
    }
  }

  export const getMySessions = async(req,res)=>{
    try {
      const sessions = await Session.find({
        learner : req.user._id
      })
      .populate("mentor","name email skillstoTeach location")
      .sort({createdAt:-1})
      res.json(sessions)
    } catch (error) {
      console.error(error.message)
      res.status(500).json({message:"Failed to fetch sessions"})
    }
  }