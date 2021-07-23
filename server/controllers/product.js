const Product = require("../models/product");
const User = require("../models/user");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create product failed");
  }
};

exports.remove = async (req, res) => {
    try {
      const deleted = await Product.findOneAndRemove({
        slug: req.params.slug,
      }).exec();
      res.json(deleted);
    } catch (err) {
      console.log(err);
      return res.staus(400).send("Product delete failed");
    }
  };

exports.listAll = async (req, res) => {
    let products = await Product.find({})
      .sort([["createdAt", "desc"]])
      .exec();
    res.json(products);
  };

exports.list = async (req, res) => {
  try {
    // createdAt desc/asc, 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3;

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .sort([[sort, -1]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

  exports.read = async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug })
      .exec();
    res.json(product);
  };

  exports.update = async (req, res) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const updated = await Product.findOneAndUpdate(
        { slug: req.params.slug },
        req.body,
        { new: true }
      ).exec();
      res.json(updated);
    } catch (err) {
      console.log("PRODUCT UPDATE ERROR ----> ", err);
      res.status(400).json({
        err: err.message,
      });
    }
  };

  exports.productStar = async (req, res) => {
    const product = await Product.findById(req.params.productId).exec();
    const user = await User.findOne({ email: req.user.email }).exec();
    const { star } = req.body;
  
    // check if currently logged in user have already added rating to this product?
    let existingRatingObject = product.ratings.find(
      (ele) => ele.postedBy.toString() === user._id.toString()
    );
  
    // if user haven't left rating yet, push it
    if (existingRatingObject === undefined) {
      let ratingAdded = await Product.findByIdAndUpdate(
        product._id,
        {
          $push: { ratings: { star, postedBy: user._id } },
        },
        { new: true }
      ).exec();
      console.log("ratingAdded", ratingAdded);
      res.json(ratingAdded);
    } else {
      // update rating if user have already left a rating
      const ratingUpdated = await Product.updateOne(
        {
          ratings: { $elemMatch: existingRatingObject },
        },
        { $set: { "ratings.$.star": star } },
        { new: true }
      ).exec();
      console.log("ratingUpdated", ratingUpdated);
      res.json(ratingUpdated);
    }
  };

  const handleQuery = async (req, res, query) => {
    const products = await Product.find({ $text: { $search: query } })
      .populate("postedBy", "_id name")
      .exec();
    console.log('query',products);
    res.json(products);
  };
  
  exports.searchFilters = async (req,res) => {
    const {
      query,
      price,
      stars,
      shipping,
      color,
      brand,
      processor,
      ram,
      HDD,
      SSD,
      graphics
    } = req.body;

    if (query) {
      console.log("query --->", query);
      await handleQuery(req, res, query);
    }

    else{
      let filteredProducts = await Product.find({});
      // console.log("filteredProducts",filteredProducts);

      if(stars){
        let x = [];
        for(let i=0;i<filteredProducts.length;i++){
          let sum=0;
          let count = 0;
          for(let r=0;r<filteredProducts[i].ratings.length;r++){
            sum = sum + filteredProducts[i].ratings[r].star;
            count++;
          }
          if(sum){
            let avg = Math.floor(sum/count);
            if(avg === stars){
              x.push(filteredProducts[i]);
            }
          }
        }
        filteredProducts = x;
      }

      if(price[1] !== 0){
        filteredProducts = filteredProducts.filter(prod => prod.price >= price[0] && prod.price <=price[1]);
      }

      if(brand && brand !== "No Filter"){
        filteredProducts = filteredProducts.filter(prod => prod.brand === brand);
      }

      if(processor && processor !== "No Filter"){
        filteredProducts = filteredProducts.filter(prod => prod.processor === processor);
      }

      if(ram && ram !== "No Filter"){
        filteredProducts = filteredProducts.filter(prod => prod.ram === ram);
      }

      if(color && color !== "No Filter"){
        filteredProducts = filteredProducts.filter(prod => prod.color === color);
      }

      if(HDD && HDD !== "No Filter"){
        filteredProducts = filteredProducts.filter(prod => prod.HDD === HDD);
      }

      if(SSD && SSD !== "No Filter"){
        filteredProducts = filteredProducts.filter(prod => prod.SSD === SSD);
      }

      if(graphics && graphics !== "No Filter"){
        filteredProducts = filteredProducts.filter(prod => prod.graphics === graphics);
      }

      if(shipping && shipping !== "No Filter"){
        filteredProducts = filteredProducts.filter(prod => prod.shipping === shipping);
      }
      res.json(filteredProducts);
      
    }

  }