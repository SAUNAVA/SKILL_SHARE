import express from 'express';
import { getMentorById, getMentors, getMySessions, sessionRequest } from '../controllers/userController.js';
import { protectAuth } from '../middleware/protectAuth.js';
import { updateAvailability  , getMentorAvailability , getMentorAvailabilityForLearner} from '../controllers/userController.js';
const router = express.Router();



router.get('/mentors' , getMentors)
router.get('/mentors/:id',protectAuth,getMentorById)
router.post('/sessions/request',protectAuth, sessionRequest)
router.get('/sessions/my-sessions',protectAuth , getMySessions)
router.put('/availability' , protectAuth , updateAvailability)
router.get('/availability' ,protectAuth, getMentorAvailability)
router.get('/:mentorId/availability',protectAuth,getMentorAvailabilityForLearner)


export default router;

