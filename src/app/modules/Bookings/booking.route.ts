import express from "express";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import { BookingController } from "./booking.controller";

const router = express.Router();


// Create a new booking (only TRAINEE)
router.post("/",auth(Role.TRAINEE), BookingController.createBooking)

// Cancel booking
router.put("/:id/cancel", auth(), BookingController.cancelBooking)

export const bookingRoute = router;