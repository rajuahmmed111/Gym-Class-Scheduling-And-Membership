# Project Title: Gym Management System

 ## Project Overview:
   The Gym Class Scheduling and Membership Management System is designed to manage gym operations efficiently. The system defines three roles: Admin, Trainer, and Trainee, each with specific permissions. Admins are responsible for creating and managing trainers, scheduling classes, and assigning trainers to these schedules. Each day can have a maximum of five class schedules, with each class lasting two hours. Trainers conduct the classes and can view their assigned class schedules but cannot create new schedules or manage trainee profiles. Trainees can create and manage their own profiles and book class schedules if there is availability, with a maximum of ten trainees per schedule.


## Live Demo

    https://gym-class-scheduling-and-membership.vercel.app/
    

## Entity-Relationship (ER) Diagram
![Gym ER-Diagram](uploads/ER-Diagram.png)

## API Documentation

    ```1. Postman Documentation
      https://documenter.getpostman.com/view/40219022/2sAYkAQNP1

    2. Auth Routes
          > POST /auth/login: Login a user

          > POST /auth/logout: Logout a user

          > GET /auth/get-me: Retrieve the profile of the logged-in user

          > PUT /auth/change-password: Change the password of the logged-in user

          > POST /auth/forgot-password: Initiate password reset process

          > POST /auth/reset-password: Complete password reset process

    3. User Routes
          > POST /users/create: Create a new user

          > GET /users: Retrieve all users

          > GET /users/:id: Retrieve a single user by ID

          > PUT /users/update: Update a user by

          > PATCH /users/profile-update: Update a user profile

          > DELETE /users/:id: Delete a user by ID


    4. Class Schedule
          > POST /class-schedule/create: Create a class schedule

          > GET /class-schedule: Retrieve all class schedule

          > GET /class-schedule/:id: Retrieve a single user by ID

          > PUT /class-schedule/id: Update a class schedule by ID

          > DELETE /class-schedule/:id: Delete a class schedule by ID


    5. Booking Class
          > POST //bookings/create: Create a booking class

          > GET /bookings/:id: Retrieve a single user by ID

          > GET /my-bookings/my-bookings: Get my booking

          > GET /class-schedule/:id: get booking class schedule

          > PATCH /class-schedule/:id: cancel booking by ID



   ## Database Schema:

   ```model User {
    id                String          @id @default(auto()) @map("_id") @db.ObjectId
    firstName         String
    lastName          String?
    email             String          @unique
    password          String
    userName          String          @unique
    dateOfBirth       DateTime?
    profileImage      String?         @default("https://i.ibb.co.com/XfLzVy23/download.png")
    UserStatus        UserStatus      @default(ACTIVE)
    otp               String?
    otpExpiry         DateTime?
    hexCode           String?
    role              Role            @default(TRAINEE)
    createdAt         DateTime        @default(now())
    updatedAt         DateTime        @updatedAt
    admin             Admin?
    createdSchedules  ClassSchedule[] @relation("CreatedBy")
    assignedSchedules ClassSchedule[] @relation("AssignedTo")
    booking           Booking[]

    @@map("users")
}

model Admin {
    id       String @id @default(auto()) @map("_id") @db.ObjectId
    userName String @unique

    email String @unique
    user  User?  @relation(fields: [email], references: [email])

    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt

    @@map("admins")
}

model ClassSchedule {
    id          String   @id @default(auto()) @map("_id") @db.ObjectId
    title       String
    description String?
    startTime   DateTime
    endTime     DateTime

    // Relations
    createdById String?   @db.ObjectId
    createdBy   User?     @relation("CreatedBy", fields: [createdById], references: [id])
    trainerId   String?   @db.ObjectId
    trainer     User?     @relation("AssignedTo", fields: [trainerId], references: [id])
    bookings    Booking[]

    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt

    @@map("class_schedules")
}

model Booking {
    id     String        @id @default(auto()) @map("_id") @db.ObjectId
    status BookingStatus @default(CONFIRMED)

    // Relations
    traineeId String? @db.ObjectId
    trainee   User?   @relation(fields: [traineeId], references: [id])

    classScheduleId String?        @db.ObjectId
    classSchedule   ClassSchedule? @relation(fields: [classScheduleId], references: [id])

    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt

    @@map("bookings")
}```


  ## Admin Credentials:
    ```email: superadmin@gmail10p.com
      password:123456```

## Installation and Setup

       1. Clone the repository : https://github.com/rajuahmmed111/Gym-Class-Scheduling-And-Membership.git

       Create a .env file:
        In the root directory of the project, create a .env file and add the following variables. Adjust the values according to your setup.

        # Basic
        NODE_ENV=development # do not add this when deploying to production

DATABASE_URL="mongodb+srv://ticket-management-system:eEdx5K0CP5kDIsoa@cluster0.wqymbxc.mongodb.net/ticket-management-system?retryWrites=true&w=majority&appName=Cluster0"
PORT = 5000

JWT_SECRET=8cae8bb543258529ea845512a6190994cac61b323cb84dba2bedf27cb
35bae7b4a4ae45e92f6d5c7e4199481bd0c5cbe9ac694e2d693b90d0d5
3f4691acdf38a

EXPIRES_IN=1d

REFRESH_TOKEN_SECRET=54c97a8391e5ad06f3cbd09ca23439ed82f1c06029694a815011b4a4b
bc504e4e8400b61540cb0986da43f571f76e0b7e2b2a6f20d69564c342
9ebaa63e58173

REFRESH_TOKEN_EXPIRES_IN=7d

RESET_PASS_TOKEN=3e4f8b9a7f8c5b1e4e7e5d9b7190d6f5

RESET_PASS_TOKEN_EXPIRES_IN=1h

# Features

Authentication API: Complete authentication system using JWT for secure token-based authentication and bcrypt for password hashing.
File Upload: Implemented using Multer with efficient file handling and short-term storage.
Data Validation: Robust data validation using Zod and Prisma
Logging: Logging with Winston and file rotation using DailyRotateFile.
API Request Logging: Logging API requests using Morgan

# Tech Stack

Typescript,
Node.js,
Express,
Mongoose,
Bcrypt,
JWT,
NodeMailer,
Multer,
ESLint,
Prettier,
Winston,
Daily-winston-rotate-file,
Morgen,

 ## Getting Started

Follow these steps to set up and run the project locally.

 ## Prerequisites
Ensure you have the following installed:

Node.js

# Installation

1.  Clone the repository:

git clone https://github.com/yourusername/your-repository.git
cd your-repository

2. Install dependencies:

Using npm:

npm install

3. Run the project:

Using npm:

npm run dev


Made with ❤️ by [RAJU AHMMED](https://my-portfolio-nine-dun-64.vercel.app/)