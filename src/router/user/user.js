const express = require("express");
const api = express.Router();
const { check } = require("express-validator");

const { createUser } = require("../../controller/user/userController");

api.post(
  "/user",

  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "valid email").isEmail(),
    check("password", "password minimum 8 characters").isLength({ min: 8 }),
  ],

  createUser
);

module.exports = api;
