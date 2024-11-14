# Blogging Platform - Frontend

Welcome to the frontend repository of the Blogging Platform. This React-based application allows users to register, log in, create, view, update, and delete blog posts. The application offers user authentication, CRUD functionality, tagging, and search features.

# Table of Contents

Features
Technology Stack
Project Structure
Installation and Setup
Usage
API Documentation

# Features

User Authentication: Register and log in with JWT-based secure authentication.
CRUD Operations: Authenticated users can create, edit, delete, and view their posts.
Post Tagging: Users can add tags to categorize posts.
Search Functionality: Search posts by title or tags to filter displayed results.
Sorting by Date: Posts can be sorted by their creation date.
Profile Management: Edit profile details after registration.
Technology Stack
Frontend: React with Context API or Redux for state management.
UI Components: Ant Design for an enhanced user interface.
HTTP Client: Axios for API requests to the backend.
Routing: React Router for navigation.

# Project Structure

/src
  /components
    /Auth
      Login.js           # Login component for user authentication
      Register.js        # Registration component for new users
      EditProfile.js     # Component for updating profile information
    /Posts
      PostList.js        # Displays a list of all blog posts
      PostForm.js        # Form for creating and editing posts
    /Layout
      Header.js          # Header with navigation links and branding
  /redux
    /actions
      authActions.js     # Defines actions for authentication flow
      postActions.js     # Defines actions for CRUD operations on posts
    /reducers
      authReducer.js     # Manages authentication state
      postReducer.js     # Manages posts-related state
    store.js             # Configures the Redux store for global state
  App.js                 # Main application component
  index.js               # Entry point for rendering the app
  api.js                 # Axios instance setup for API calls

# Installation and Setup

Prerequisites
Ensure that you have Node.js and npm installed on your system.

Steps

Clone the Repository:
git clone https://github.com/ayush7078/blog-platform-frontend.git
cd blog-platform-frontend

Install Dependencies:
npm install

Environment Variables:
Create a .env file in the root directory with the backend API URL:

REACT_APP_API_URL=http://localhost:5000/api

Run the Application:
npm start
The application will be accessible at http://localhost:3000.

Usage
Register: New users can register for an account.
Login: Access the platform with your registered credentials.
Create, Edit, and Delete Posts: Authenticated users can manage their posts.
Search: Use the search bar to find posts by title or tags.
Profile Management: Update profile information through the Edit Profile page.

# API Documentation
Below are the API endpoints this frontend application interacts with:

Authentication Endpoints:
POST /auth/register - Register a new user.
POST /auth/login - Log in and receive a JWT token.

Blog Post Endpoints:
GET /posts - Retrieve all blog posts.
POST /posts - Create a new blog post (authenticated users only).
PUT /posts/:id - Update a specific post (authenticated and authorized users only).
DELETE /posts/:id - Delete a post (authenticated and authorized users only).
GET /posts/search?query= - Search posts by title or tags.