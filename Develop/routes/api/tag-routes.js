const router = require('express').Router();
const e = require('express');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const productData = await Tag.findAll({
      include: [{
        model: Product, ProductTag,
      },],
    });
    
    res.status(200).json({ productData });
    
    

    
  } catch (err) {
    res.status(500).json(err);
}
});
  // find all tags
  // be sure to include its associated Product data


router.get('/:id',async (req, res) => {
    // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const id = req.params.id;
    const productData = await Tag.findByPk(id,{
      include: [{
        model: Product, ProductTag,

      },]

    });
    res.status(200).json({ productData });
  


  } catch (err) {
    res.status(500).json(err);
}
});



router.post('/',  (req, res) => {
//   {
//     "id":15,
//     "tag_name":"TESTING",
//     "products":[
//        {
//           "id":3,
//           "product_name":"TESTING",
//           "price":23,
//           "stock":12,
//           "category_id":4,
//           "product_tag":{
//              "id":5,
//              "product_id":3,
//              "tag_id":1,
//              "productId":3,
//              "tagId":1
//           }
//        }
//     ]
//  }
  // create a new tag
  Tag.create(req.body)
  .then((tag) => {
    res.status(200).json(tag);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
  
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body)
  .then((tag) => {
    res.status(200).json(tag);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
  

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    // pass in req.params.id into destroy.
    const productData = Tag.destroy({
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
