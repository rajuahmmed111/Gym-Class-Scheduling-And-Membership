import express from 'express';
import { Role } from '@prisma/client';
import auth from '../../middleware/auth';
import { ClassScheduleController } from './ClassSchedule.controller';

const router = express.Router();

// Create a new class schedule (only ADMIN)
router.post(
  '/create',
  auth(Role.ADMIN),
  ClassScheduleController.createClassSchedule
);

// Get class schedule by ID
router.get('/:id', auth(), ClassScheduleController.getClassScheduleById);

// Get all class schedules with optional filters
router.get('/', auth(), ClassScheduleController.getClassSchedules);

// Get available class schedules (less than 10 trainees)
router.get('/available', ClassScheduleController.getAvailableClassSchedules);

// Update class schedule (only ADMIN)
router.put(
  '/:id',
  auth(Role.ADMIN),
  ClassScheduleController.updateClassSchedule
);

// Delete class schedule
router.delete(
  '/:id',
  auth(Role.ADMIN),
  ClassScheduleController.deleteClassSchedule
);

export const classScheduleRoute = router;
