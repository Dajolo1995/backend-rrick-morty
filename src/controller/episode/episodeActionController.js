const { episodio: Episode } = require("../../../models");
const { validationResult } = require("express-validator");

const createEpisode = async (req, res) => {
  try {
    const episode = await Episode.create(req.body);

    return res.status(200).send({
      episode,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal error server");
  }
};

const updateEpisode = async (req, res) => {
  try {
    const episode = await Episode.findOne({ where: { id: req.params.id } });
    if (!episode) return res.status(404).send({ msg: "not found" });

    episode.update(req.body);

    return res.status(200).send({
      episode,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal error server");
  }
};

const deleteEpisode = async (req, res) => {
  try {
    const episode = await Episode.findOne({ where: { id: req.params.id } });
    if (!episode) return res.status(404).send({ msg: "not found" });

    const episodes = await Episode.destroy({ where: { id: req.params.id } });
    return res.status(200).send({ msg: "Episode delete.", episodes });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createEpisode,
  updateEpisode,
  deleteEpisode
};
