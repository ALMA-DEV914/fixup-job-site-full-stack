const router = require("express").Router();
const { Location } = require("../../models");

// get all users
router.get("/", async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.json(locations);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const location = Location.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!location) {
      res.status(404).json({ message: "No location with that ID" });
      return;
    } else {
      res.json(location);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const location = await Location.create({
      zip_code: req.body.zip_code,
    });
    if (!location) {
      res.status(404).json({ message: "No location with that ID" });
      return;
    } else {
      res.json(location);
    }
  } catch (err) {
    console.log(err.errors);
    res.status(500).json(err);
  }
});

module.exports = router;
