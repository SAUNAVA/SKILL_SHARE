import express from 'express';
import { getMentorRequests, respondtoRequests } from '../controllers/sessionController.js';
import { protectAuth } from '../middleware/protectAuth.js';

const Router = express.Router();


Router.get('/mentor-requests', protectAuth ,getMentorRequests)
Router.patch('/:id/respond' , protectAuth , respondtoRequests)

export default Router