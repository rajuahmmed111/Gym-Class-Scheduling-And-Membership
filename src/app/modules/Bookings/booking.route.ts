import express from "express";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import { BookingController } from "./booking.controller";

const router = express.Router();


// Create a new booking (only TRAINEE)
router.post("/",auth(Role.TRAINEE), BookingController.createBooking)

export const bookingRoute = router;