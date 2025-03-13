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

// Get class schedule by ID
const getClassScheduleById = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await ClassScheduleService.getClassScheduleById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class schedule retrieved successfully',
    data: result,
  });
});

// get all class schedules
const getClassSchedules = catchAsync(async (req, res) => {
  const result = await ClassScheduleService.getClassSchedules();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class schedules retrieved successfully',
    data: result,
  });
});

// update class schedule
const updateClassSchedule = catchAsync(async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const data = req.body;

  const result = await ClassScheduleService.updateClassSchedule(id,userId, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class schedule updated successfully',
    data: result,
  });
});

export const ClassScheduleController = {
  createClassSchedule,
  getClassScheduleById,
  getClassSchedules,
  updateClassSchedule,
  deleteClassSchedule,
};
