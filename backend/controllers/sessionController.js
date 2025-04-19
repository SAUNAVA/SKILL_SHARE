import Session from "../models/sessions.model.js"
import User from "../models/user.model.js"


export const getMentorRequests =  async(req,res)=>{
    try {
        const requests = await Session.find({mentor : req.user._id}).populate('learner', 'name email').sort({createdAt: -1})
        await User.findByIdAndUpdate(req.user._id, {sessionRequestsReceived: requests.map((r) => r._id)})
        res.json(requests)
    } catch (error) {
        res.status(500).json(error.message,{message : 'Unable to fetch requests'})
    }
}

export const respondtoRequests = async(req,res)=>{
    try {
        const session = await Session.findById(req.params.id);
        if (!session) return res.status(404).json({ message: 'Session not found' });
    
        if (String(session.mentor) !== String(req.user._id)) {
          return res.status(403).json({ message: 'Not authorized' });
        }
    
        session.status = req.body.actionType === 'accept' ? 'accepted' : 'rejected';
        await session.save();
        await session.populate('learner', 'name email skills');
        await User.findByIdAndUpdate(req.user._id,{$addToSet : {sessionAccepted: session._id}});
        res.json(session);
      } catch (error) {
        res.status(500).json( error.message , {message: 'Action failed' });
      }
}