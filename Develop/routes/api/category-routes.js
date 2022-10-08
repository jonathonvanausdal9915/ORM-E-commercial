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
//   {
//     "id":15,
//     "category_name":"TESTING",
//     "products":[
//        {
//           "id":15,
//           "product_name":"TESTING",
//           "price":15,
//           "stock":14,
//           "category_id":1
//        }
//     ]
//  }
  // create a new category
  Category.create(req.body)
  .then((category) => {
    res.status(200).json(category);
  })
  .catch((err) => {
    res.status(400).json({message: "something went wrong"});
  });

});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body)
  .then((category) => {
    res.status(200).json(category);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    // pass in req.params.id into destroy.
    const productData = Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if(!productData) {
      res.status(404).json({ message: "No product found with that id!"});
      return;
    }
    res.status(200).json(productData,);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
