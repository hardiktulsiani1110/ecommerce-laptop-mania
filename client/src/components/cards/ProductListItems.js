import React from "react";

const ProductListItems = ({ product }) => {
  const {
    processor,
    description,
    price,
    ram,
    shipping,
    color,
    brand,
    quantity,
    sold,
    HDD,
    SSD,
    graphics
  } = product;

  return (
    <ul className="list-group">
      <li className="list-group-item flex-row justify-content-between">
        <b>Price{" "}</b>
        <span className="label label-default label-pull pull-right">
          {price}
        </span>
      </li>

      <li className="list-group-item">
        <b>Brand{" "}</b>
        <span className="label label-default label-pill pull-right">
          {brand}
        </span>
      </li>

      <li className="list-group-item">
      <b>RAM{" "}</b>
        <span className="label label-default label-pill pull-right">
          {ram}
        </span>
      </li>

      <li className="list-group-item">
      <b>Processor{" "}</b>
        <span className="label label-default label-pill pull-right">
          {processor}
        </span>
      </li>

      <li className="list-group-item">
      <b>HDD{" "}</b>
        <span className="label label-default label-pill pull-right">
          {HDD}
        </span>
      </li>

      <li className="list-group-item">
      <b>SSD{" "}</b>
        <span className="label label-default label-pill pull-right">
          {SSD}
        </span>
      </li>

      <li className="list-group-item">
      <b>Graphics{" "}</b>
        <span className="label label-default label-pill pull-right">
          {graphics}
        </span>
      </li>


      <li className="list-group-item">
      <b>Shipping{" "}</b>
        <span className="label label-default label-pill pull-right">
          {shipping}
        </span>
      </li>

      <li className="list-group-item">
      <b>Color{" "}</b>
        <span className="label label-default label-pill pull-right">
          {color }
        </span>
      </li>


      <li className="list-group-item">
      <b>Available{" "}</b>
        <span className="label label-default label-pill pull-right">
          {quantity}
        </span>
      </li>

      <li className="list-group-item">
      <b>Sold{" "}</b>
        <span className="label label-default label-pill pull-right">
          {sold}
        </span>
      </li>

      <li className="list-group-item">
      <b>description{" "}</b>
        <span className="label label-default label-pill pull-right">
          {description}
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;
