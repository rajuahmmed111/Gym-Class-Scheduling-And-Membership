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

// get class schedule by ID
router.get('/:id', auth(), ClassScheduleController.getClassScheduleById);

// get all class schedules
router.get('/', auth(), ClassScheduleController.getClassSchedules);

// update class schedule (only ADMIN)
router.put(
  '/:id',
  auth(Role.ADMIN),
  ClassScheduleController.updateClassSchedule
);

// delete class schedule
router.delete(
  '/:id',
  auth(Role.ADMIN),
  ClassScheduleController.deleteClassSchedule
);

export const classScheduleRoute = router;
