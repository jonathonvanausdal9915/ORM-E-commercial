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
  Category.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});
  // create a new category


router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
