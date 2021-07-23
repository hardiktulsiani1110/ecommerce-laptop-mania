import React,{useState} from "react";
import { Card,Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined  } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useDispatch } from "react-redux";
import {toast} from 'react-toastify';
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  const dispatch = useDispatch();

  const { title, description, image, slug , price } = product;

  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      //cart from local storage
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...product,
        count: 1,
      });
      let unique = _.uniqWith(cart, _.isEqual);//duplicates removing
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // adding to redux
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      toast.success(`${title} added to cart`);
    }
  };

  return (
    <>
    {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}
    <Card
      cover={
        <img
          src={image}
          style={{ height: "200px", objectFit: "cover" }}
          className="p-1"
          alt="imageholder"
        />
      }
      actions={[
        <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
        <Tooltip title={tooltip}>
            <a onClick={handleAddToCart} disabled={product.quantity < 1}>
              <ShoppingCartOutlined className="text-success" /> <br />
              {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
            </a>
          </Tooltip>,
      ]}
    >
      <Meta
        title={`${title} - Rs${price}`}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
    </>
  );
};

export default ProductCard;
