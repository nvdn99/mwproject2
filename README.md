
# Node.js Car Management System

This is a simple car management system built with Node.js. It allows you to manage a list of cars by providing basic CRUD (Create, Read, Update, Delete) operations through a RESTful API. The car data is stored in a JSON file.

# Features

Filesystem and Path Modules: File operations are implemented using Node.js's built-in fs and path modules. Car data is read from and written to a JSON file on the server.

HTTP Module: The system extends the HTTP server using Node.js's http module. It listens for incoming HTTP requests and responds with appropriate data.

RESTful API: The system follows RESTful principles to interact with car data. It provides the following endpoints:
GET /api/v1/cars: Retrieve a list of cars in JSON format.
POST /api/v1/cars: Add a new car to the list.

Error Handling: Improved error handling with meaningful error messages is provided to handle various error scenarios.

# Usage


Access the system by opening your web browser and navigating to http://localhost:3001/. You'll find a simple web page with a link to view cars.

To retrieve the car list, make a GET request to http://localhost:3001/api/v1/cars.

To add a new car, make a POST request to http://localhost:3001/api/v1/cars with JSON data.