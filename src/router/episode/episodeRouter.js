const express = require("express");
const api = express.Router();
const { check } = require("express-validator");
const authToken = require("../../middleware/authToken");

const {
  createEpisode,
  updateEpisode,
  deleteEpisode,
} = require("../../controller/episode/episodeActionController");

const {
  getEpisode,
  getEpisodeId,
} = require("../../controller/episode/getEpisodeController");

api.post("/episode", authToken, createEpisode);
api.get("/episode", authToken, getEpisode);
api.get("/episode/:id", authToken, getEpisodeId);
api.put("/episode/:id", authToken, updateEpisode);
api.delete("/episode/:id", authToken, deleteEpisode);

module.exports = api;
