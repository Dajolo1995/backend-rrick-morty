const express = require("express");
const { check } = require("express-validator");

const api = express.Router();

const { sigIn } = require("../../controller/auth/authController");

api.post(
  "/auth",
  [
    check("email", "valid email").isEmail(),
    check("password", "password minimum 8 characters").isLength({ min: 8 }),
  ],
  sigIn
);

module.exports = api;
