// NOTE 1) Import express from 'express';
const express = require('express');

// NOTE 2) Set up server by calling express
const server = express();

// Middleware
server.use(express.json());

let users = [
  {
    id: '1',
    name: 'Eddie',
    bio: 'Front-End Web Developer',
  },
  {
    id: '2',
    name: 'Joe',
    bio: 'Full Stack Web Developer',
  },
];

// NOTE 4) ENDPOINTS
server.post('/api/users', (req, res) => {
  // Creates a user using the information sent inside the `request body`.
  /*
   If the request body is missing the name or bio property:
   respond with HTTP status code 400 (Bad Request).
   return the following JSON response: { errorMessage: "Please provide name and bio for the user." }. 
  */
  /*
    If the information about the user is valid:
    save the new user the the database.
    respond with HTTP status code 201 (Created).
    return the newly created user document.
  */
  /* FIXME NO CLUE HOW TO DO THIS
    If there's an error while saving the user:
    respond with HTTP status code 500 (Server Error).
    return the following JSON object: { errorMessage: "There was an error while saving the user to the database" }. 
  */

  const user = req.body;

  if (req.body.bio === undefined || req.body.name === undefined) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else if (req.body.bio === '' || req.body.name === '') {
    res.status(400).json({
      errorMessage:
        'Please provide name and bio for the user, not an empty string.',
    });
  } else {
    users.push(user);
    res.status(201).json(users);
  }
});

server.get('/api/users', (req, res) => {
  // Returns an array users.
  /* If there's an error in retrieving the users from the database:
      respond with HTTP status code 500.
      return the following JSON object: { errorMessage: "The users information could not be retrieved." }.
  */

  res.status(200).json(users);
});

server.get('/api/users/:id', (req, res) => {
  // Returns the user object with the specified `id`.
  const id = req.params.id;
  const user = users.find((user) => user.id === id);
  // If we find the user...
  if (user) {
    // Send back response with the user
    res.status(200).json(user);
  } else {
    // Otherwise send back response with error message.
    res.status(404).json({ message: 'User not found.' });
  }
});

server.delete('/api/users/:id', (req, res) => {
  // Removes the user with the specified `id` and returns the deleted user.
});

server.patch('/api/users/:id', (req, res) => {
  // Updates the user with the specified `id` using data from the `request body`. Returns the modified user
});

// NOTE 3) The server is running on http://localhost:5000
const port = 5000;
server.listen(port, () => console.log(`\n== api on port ${port} ==\n`));
