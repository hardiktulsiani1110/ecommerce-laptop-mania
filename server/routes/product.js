const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const {
    create,
    listAll,
    remove,
    read,
    update,
    list,
    productsCount,
    productStar,
    searchFilters,
  } = require("../controllers/product");
  

  router.post("/create-product", authCheck, adminCheck, create);
  router.get("/products/total", productsCount);
  
  router.get("/products/:count", listAll);
  router.delete("/product/:slug", authCheck, adminCheck, remove);
  router.get("/product/:slug", read);
  router.put("/product/:slug", authCheck, adminCheck, update);
  
  router.post("/products", list);

  router.put("/product/star/:productId", authCheck, productStar);

  router.post("/search/filters", searchFilters);

module.exports = router;