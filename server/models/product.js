const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 24,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 20,
    },
    quantity: {
        type:Number,
        required:true
    },
    sold: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required:true
    },
    shipping: {
      type: String,
      default:"Yes"
    },
    color: {
      type: String,
      required:true
    },
    brand: {
      type: String,
      required:true,
      // enum: ["HP", "Dell", "Lenovo", "Asus"],
    },
    processor:{
      type:String,
      required:true,
      // enum:["i3","i5","i7","i9"]
    },
    ram:{
      type:String,
      required:true,
      // enum:["8GB","16GB"]
    },
    HDD:{
      type:String,
      required:true,
      // enum:["0GB","512GB","1TB","2TB"]
    },
    SSD:{
      type:String,
      required:true,
      // enum:["0GB","256GB","512GB","1TB"]
    },
    graphics:{
      type:String,
      required:true,
      //enum:["Integrated","2GB","4GB","8GB"]
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
