const { Router } = require('express');

const { flats, houses, entrances } = require('../../data');

const router = Router();

router.get('/houses', (req, res) => {
  res.json(houses);
});

router.get('/entrances', (req, res) => {
  const { houseId } = req.query;
  const filtredEnterances = entrances.filter(
    ({ house_id }) => house_id === houseId,
  );
  res.json(filtredEnterances);
});

router.get('/floors', (req, res) => {
  const { entranceId } = req.query;

  const floors = entrances
    .find((e) => e.id === entranceId)
    .floors.map((record) => {
      const detailedFlats = record.flats.map((f) => ({
        pipe: f.number,
        ...flats[f.id],
      }));

      return { flats: detailedFlats, floor: record.floor };
    });

  res.json(floors);
});

module.exports = router;
