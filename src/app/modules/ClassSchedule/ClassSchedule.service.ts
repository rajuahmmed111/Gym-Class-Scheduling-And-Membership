import { Role } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';

// create a new class schedule
const createClassSchedule = async (classScheduleData: any, userId: string) => {
  const { trainerId, startTime } = classScheduleData;

  //  validate ADMIN role
  const adminUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!adminUser || adminUser.role !== Role.ADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin users can create class schedules'
    );
  }

  // validate trainer
  const trainer = await prisma.user.findUnique({
    where: {
      id: trainerId,
      role: Role.TRAINER,
    },
  });
  if (!trainer || trainer.role !== Role.TRAINER) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trainer not found');
  }

  // validate class Time (2 hours duration)
  const parsedStartTime = new Date(startTime);
  if (isNaN(parsedStartTime.getTime())) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid start time');
  }

  // class is exactly 2 hours long
  const parsedEndTime = new Date(parsedStartTime);
  parsedEndTime.setHours(parsedEndTime.getHours() + 2);

  // trainer availability (no overlapping classes)
  const isTrainerAvailableDuringTime = await prisma.classSchedule.count({
    where: {
      trainerId,
      OR: [
        {
          AND: [
            { startTime: { lte: parsedEndTime } },
            { endTime: { gte: parsedStartTime } },
          ],
        },
        {
          AND: [
            { startTime: { lte: parsedStartTime } },
            { endTime: { gte: parsedEndTime } },
          ],
        },
      ],
    },
  });

  if (isTrainerAvailableDuringTime > 0) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Trainer is not available during the specified time'
    );
  }

  // maximum of 5 classes per day
  const startOfDay = new Date(parsedStartTime);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(parsedStartTime);
  endOfDay.setHours(23, 59, 59, 999);

  const trainerDailyClasses = await prisma.classSchedule.count({
    where: {
      trainerId,
      startTime: { gte: startOfDay, lte: endOfDay },
    },
  });

  if (trainerDailyClasses >= 5) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Trainer cannot have more than 5 classes per day'
    );
  }

  //create class schedule
  const newClassSchedule = await prisma.classSchedule.create({
    data: {
      ...classScheduleData,
      createdById: userId,
      endTime: parsedEndTime,
    },
  });

  return newClassSchedule;
};

// Get class schedule by ID
const getClassScheduleById = async (classScheduleId: string) => {
  const classSchedule = await prisma.classSchedule.findUnique({
    where: { id: classScheduleId },
    include: {
      trainer: true,
    },
  });

  if (!classSchedule) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class schedule not found');
  }

  return classSchedule;
};

// get all class schedules
const getClassSchedules = async () => {
  const classSchedules = await prisma.classSchedule.findMany({
    include: {
      trainer: true,
    },
  });

  return classSchedules;
};

// update class schedule

const updateClassSchedule = async (
  classScheduleId: string,
  userId: string,
  updates: any
) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    throw new ApiError(httpStatus.FORBIDDEN, 'User not found');
  }

  const classSchedule = await prisma.classSchedule.findUnique({
    where: { id: classScheduleId },
  });

  if (!classSchedule) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class schedule not found');
  }

  const updatedClassSchedule = await prisma.classSchedule.update({
    where: { id: classScheduleId },
    data: updates,
  });

  return updatedClassSchedule;
};

// delete class schedule
const deleteClassSchedule = async (classScheduleId: string, userId: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    throw new ApiError(httpStatus.FORBIDDEN, 'User not found');
  }

  const classSchedule = await prisma.classSchedule.findUnique({
    where: { id: classScheduleId },
  });

  if (!classSchedule) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class schedule not found');
  }

  await prisma.classSchedule.delete({
    where: { id: classScheduleId },
  });

  return classSchedule;
};

export const ClassScheduleService = {
  createClassSchedule,
  getClassScheduleById,
  getClassSchedules,
  updateClassSchedule,
  deleteClassSchedule,
};
