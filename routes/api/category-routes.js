const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [Product]
  })
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.json(err);
    });
  // be sure to include its associated Products
});


router.get('/:id', (req, res) => {
 Category.findOne({
   where: {
     id: req.params.id
   },
   include: [Product]
 })
 .then((categories) => {
   res.json(categories);
 })
 .catch((err) => {
   res.json(err);
 });
});

router.post('/', async(req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if(!categoryData) {
      res.status(404).json({ message: 'No category found with this id!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!categoryData) {
      res.status(404).json({ message: 'No category found with this id!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
