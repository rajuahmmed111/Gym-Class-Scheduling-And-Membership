import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ClassScheduleService } from './ClassSchedule.service';
import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';

// Create a new class schedule
const createClassSchedule = catchAsync(async (req, res) => {
  const data = req.body;
  const createdById = req.user.id;

  const result = await ClassScheduleService.createClassSchedule(
    data,
    createdById
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Class schedule created successfully',
    data: result,
  });
});

export const ClassScheduleController = {
  createClassSchedule,
  getClassScheduleById,
  getClassSchedules,
  getAvailableClassSchedules,
  updateClassSchedule,
  deleteClassSchedule,
};
