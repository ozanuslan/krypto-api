const express = require("express");
const router = express.Router();
const statsFetcher = require('../fetch/stats');

router.get("/:id", async (req, res) => {
    if (statsFetcher.getStats().has(req.params.id)) {
      res.send(statsFetcher.getStats().get(req.params.id));
    } else {
      res.sendStatus(404);
      res.render("Requested resource doesn't exist");
    }
});

module.exports = router;