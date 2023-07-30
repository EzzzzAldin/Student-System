# Student Management System API

This is an API for a Student Management System built using Node.js, MongoDB, Express.js, Mongoose, JWT, and SocketIO. The project is divided into two parts: admin and student routes.

## Project Structure

The project is divided into two parts:

1. **Admin Routes:** This part of the project contains the following functionalities:

- Create a new student account
- Create a new admin account
- Registration of the academic year, academic subjects, and grades of students
- Modify certain accounts to add some details

2. **Student Routes:** This part of the project contains the following functionalities:

- View student profile, including email, academic year, and total academic grades
- View exam results
- View ranking among students of the academic year

Before all that, there is a login interface to protect data and to determine who is logged in, whether it is a student or an administrator.

## Technologies Used

The following technologies were used to build this project:

- Node.js
- MongoDB
- Express.js
- Mongoose
- JWT
- SocketIO

## Getting Started

### Prerequisites

To run this project, you will need to have Node.js and MongoDB installed on your system.

### Installation

1. Clone the repository: https://github.com/EzzzzAldin/Student-System.git
2. Navigate to the project directory: cd student-management-system-api
3. Install the dependencies: npm install
### Usage

To start the server, run the following command in the project directory: npm start

The server will start running on `http://localhost:3000`.

## Conclusion

That's it! This API provides a simple way to manage and view student academic information. If you have any questions or suggestions, please feel free to contact us. Thank you for using our API!
