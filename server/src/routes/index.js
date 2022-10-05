const { Router } = require('express');

const { flats, houses, entrances } = require('../../data');

const router = Router();

router.get('/flats', (req, res) => {
  res.json(flats);
});

router.get('/houses', (req, res) => {
  res.json(houses);
});

router.get('/entrances', (req, res) => {
  res.json(entrances[0]);
});

module.exports = router;
