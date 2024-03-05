# Epicure: Backend Development 🍽️👨‍🍳

Welcome to the backend development phase of Epicure! This section focuses on the server-side development for our sophisticated food ordering website showcasing Tel Aviv's top restaurants.

## 📌 Overview
The backend of Epicure is responsible for handling data management, authentication, and interaction with the database. It serves as the backbone for our frontend application, ensuring seamless communication and operation.

## 📌 Key Features
- **Restaurant Management:** Perform CRUD operations to manage restaurant information.
- **Dish Management:** Organize and manage the dishes offered by restaurants.
- **Chef Management:** Manage the chefs associated with restaurants.

## 📌 Technologies Used
The backend of Epicure is built using the MERN stack:
- **MongoDB:** A NoSQL database for storing restaurant, dish, user, and order data.
- **Express.js:** A Node.js web application framework for building robust APIs.
- **React:** A JavaScript library for building user interfaces.
- **Node.js:** A JavaScript runtime for executing server-side code.

## 📌 How to Run the Project
To run the Epicure backend project locally, follow these steps:

1. Clone the repository:

    ```
    git clone https://github.com/your-username/epicure-backend.git
    ```

2. Navigate to the project directory:

    ```
    cd epicure-backend
    ```

3. Install dependencies:

    ```
    npm install
    # or
    yarn install
    ```

4. Set up environment variables:
   
   Create a `.env` file in the root directory and define the following variables:
    ```
    MONGODB_URI=your_mongodb_connection_string
    SECRET_KEY=your_secret_key_for_jwt

    ```

5. Start the development server:

 ```
 npm start
 # or
 yarn start
 ```

This will start the backend server and allow the frontend application to communicate with it.

Bon appétit and happy coding! 🍽️✨
