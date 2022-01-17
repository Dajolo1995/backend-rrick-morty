const { episodio: Episode } = require("../../../models");

const getEpisode = async (req, res) => {
  try {
    const episode = await Episode.findAll();
    res.status(200).json(episode);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Internal error server" });
  }
};

const getEpisodeId = async (req, res) => {
  try {
    let episode = await Episode.findOne({ where: { id: req.params.id } });
    res.status(200).send({ episode });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal error server");
  }
};

module.exports = {
  getEpisode,
  getEpisodeId,
};
