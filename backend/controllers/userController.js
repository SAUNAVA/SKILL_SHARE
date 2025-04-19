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
    const { name, bio, skillstoLearn, skillstoTeach, location, role } = req.body;

    // Build the update object dynamically
    const updatedData = {
      ...(name && { name }),
      ...(bio && { bio }),
      ...(skillstoLearn && { skillstoLearn }),
      ...(skillstoTeach && { skillstoTeach }),
      ...(location && { location }),
      ...(role && { role }),
    };
    

    // Update the user without touching the availability field
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updatedData },
      { new: true, runValidators: true } // Enable validation only for provided fields
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if all required fields are now filled
    const isComplete =
      updatedUser.name &&
      updatedUser.bio &&
      updatedUser.skillstoLearn?.length > 0 &&
      updatedUser.skillstoTeach?.length > 0 &&
      updatedUser.location &&
      updatedUser.role;

    updatedUser.isProfileComplete = !!isComplete;

    // Save the updated user
    await updatedUser.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error updating profile', error: error.message });
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
      res.status(500).json({message:"Failed to create session" , error:error.message})
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


  export const updateAvailability = async(req,res)=>{
    try {
      const {availability} = req.body;

      if(!Array.isArray(availability)){
        return res.status(400).json({message : 'Invalid format for availability'})
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {availability},
        {new : true}
      )

      res.json({message : 'Availability updated successfully', availability: updatedUser.availability})
    } catch (error) {
      console.error(error.message)
      res.status(500).json({message:"Failed to update availability"})
    }
  }

  export const getMentorAvailability = async (req, res) => {
    try {
      const mentor = await User.findById(req.user._id).select('availability');
      res.json(mentor.availability);
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ message: 'Could not fetch availability' });
    }
  };
  export const getMentorAvailabilityForLearner = async (req, res) => {
    try {
      const {mentorId} = req.params;
      const mentor = await User.findById(mentorId).select('availability');
      res.json(mentor.availability);
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ message: error.message });
    }
  };