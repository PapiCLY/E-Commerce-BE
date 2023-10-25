const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [Product]
  })
    .then((tags) => {
      res.json(tags);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});


router.get('/:id', (req, res) => {
  Tag.fineOne({
    where: {
      id: req.params.id
    },
    include: [Product]
  })
    .then((tags) => {
      res.json(tags);
    })
    .catch((err) => {
      res.status(400).json(err);
    })
    .then((tags) => {
      res.json(tags);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post('/', async(req, res) => {
  try{
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [rowsUpdated, [tagData]] = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true, // This is needed to get the updated record
    });

    if (rowsUpdated === 0) {
      return res.status(404).json({ message: 'No tag found with this id!' });
    }

    res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', async(req, res) => {
  try{
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!tagData) {
      res.status(404).json({ message: 'No tag found with this id!'});
      return;
    }
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
