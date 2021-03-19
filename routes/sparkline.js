const express = require("express");
const router = express.Router();
const sparklineFetcher = require("../fetch/sparkline");

router.get("/daily/:id", async (req, res) => {
  if (sparklineFetcher.getDailySparkline().has(req.params.id)) {
    res.send(sparklineFetcher.getDailySparkline().get(req.params.id));
  } else {
    res.sendStatus(404);
    res.render("Requested resource doesn't exist");
  }
});

router.get("/weekly/:id", async (req, res) => {
  if (sparklineFetcher.getWeeklySparkline().has(req.params.id)) {
    res.send(sparklineFetcher.getWeeklySparkline().get(req.params.id));
  } else {
    res.sendStatus(404);
    res.render("Requested resource doesn't exist");
  }
});

router.get("/monthly/:id", async (req, res) => {
  if (sparklineFetcher.getMonthlySparkline().has(req.params.id)) {
    res.send(sparklineFetcher.getMonthlySparkline().get(req.params.id));
  } else {
    res.sendStatus(404);
    res.render("Requested resource doesn't exist");
  }
});

router.get("/yearly/:id", async (req, res) => {
  if (sparklineFetcher.getYearlySparkline().has(req.params.id)) {
    res.send(sparklineFetcher.getYearlySparkline().get(req.params.id));
  } else {
    res.sendStatus(404);
    res.render("Requested resource doesn't exist");
  }
});

module.exports = router;
