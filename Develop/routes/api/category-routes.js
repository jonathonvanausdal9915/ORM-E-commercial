const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const productData = await Category.findAll({
      include: [{
        model: Product,
      },],
    });
    
    res.status(200).json({ productData });
    
    

    
  } catch (err) {
    res.status(500).json(err);
}
});
  // find all categories
  // be sure to include its associated Products


router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const productData = await Category.findByPk(id,{
      include: [{
        model: Product,

      },]

    });
    res.status(200).json({ productData });
  


  } catch (err) {
    res.status(500).json(err);
}
});
  // find one category by its `id` value
  // be sure to include its associated Products


router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
