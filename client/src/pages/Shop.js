import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Radio } from "antd";
import {
  MoneyCollectOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Star from "../components/forms/Star";

const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [star, setStar] = useState("");
  const [brands, setBrands] = useState([
    "No Filter",
    "dell",
    "HP",
    "asus",
    "lenovo",
  ]);
  const [brand, setBrand] = useState("");
  const [HDDs, setHDDs] = useState([
    "No Filter",
    "0GB",
    "512GB",
    "1TB",
    "2TB",
  ]);
  const [HDD, setHDD] = useState("");
  const [SSDs, setSSDs] = useState([
    "No Filter",
    "0GB",
    "256GB",
    "512GB",
    "1TB",
  ]);
  const [SSD, setSSD] = useState("");
  const [graphicss, setGraphicss] = useState([
    "No Filter",
    "Integrated",
    "2GB",
    "4GB",
    "8GB",
  ]);
  const [graphics, setGraphics] = useState("");
  const [processors, setProcessors] = useState([
    "No Filter",
    "i3",
    "i5",
    "i7",
    "i9",
  ]);
  const [processor, setProcessor] = useState("");
  const [rams, setRams] = useState([
    "No Filter",
    "8GB",
    "16GB",
  ]);
  const [ram, setRam] = useState("");
  const [colors, setColors] = useState([
    "No Filter",
    "black",
    "silver",
    "white",
    "blue",
  ]);
  const [color, setColor] = useState("");
  const [shippings,setShippings] = useState([
    "No Filter",
    "Yes",
    "No"
  ])
  const [shipping, setShipping] = useState("");

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
  }, []);

  const fetchProducts = (arg) => {
    setLoading(true);
    fetchProductsByFilter(arg).then((res) => {
      setLoading(false);
      setProducts(res.data);
    });
    setLoading(false);
  };

  // 1 by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2 user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3 price range
  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price,stars:star,brand,processor,ram,color,HDD,SSD,graphics,shipping });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    // reset
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4 by star rating
  const handleStarClick = (num) => {
    // console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setStar(num);
    fetchProducts({ price,stars:num,brand,processor,ram,color,HDD,SSD,graphics,shipping });
  };

  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  // 5 brand name
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        key={b}
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4"
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setBrand(e.target.value);
    fetchProducts({ price,stars:star,brand:e.target.value,processor,ram,color,HDD,SSD,graphics,shipping });
  };

  // 6 on color
  const showColors = () =>
    colors.map((c) => (
      <Radio
        key={c}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setColor(e.target.value);
    fetchProducts({ price,stars:star,brand,processor,ram,color:e.target.value,HDD,SSD,graphics,shipping });
  };

  // 7 on ram
  const showRams = () =>
    rams.map((r) => (
      <Radio
        key={r}
        value={r}
        name={r}
        checked={r === ram}
        onChange={handleRam}
        className="pb-1 pl-4 pr-4"
      >
        {r}
      </Radio>
    ));

  const handleRam = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setRam(e.target.value);
    fetchProducts({ price,stars:star,brand,processor,ram:e.target.value,color,HDD,SSD,graphics,shipping });
  };

  // 8 on processor
  const showProcessors = () =>
    processors.map((p) => (
      <Radio
        key={p}
        value={p}
        name={p}
        checked={p === processor}
        onChange={handleProcessor}
        className="pb-1 pl-4 pr-4"
      >
        {p}
      </Radio>
    ));

  const handleProcessor = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setProcessor(e.target.value);
    fetchProducts({ price,stars:star,brand,processor:e.target.value,ram,color,HDD,SSD,graphics,shipping });
  };

  // 9 on HDD
  const showHDDs = () =>
    HDDs.map((h) => (
      <Radio
        key={h}
        value={h}
        name={h}
        checked={h === HDD}
        onChange={handleHDD}
        className="pb-1 pl-4 pr-4"
      >
        {h}
      </Radio>
    ));

  const handleHDD = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setHDD(e.target.value);
    fetchProducts({ price,stars:star,brand,processor,ram,color,HDD:e.target.value,SSD,graphics,shipping });
  };

  // 10 on SSD
  const showSSDs = () =>
    SSDs.map((s) => (
      <Radio
        key={s}
        value={s}
        name={s}
        checked={s === SSD}
        onChange={handleSSD}
        className="pb-1 pl-4 pr-4"
      >
        {s}
      </Radio>
    ));

  const handleSSD = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setSSD(e.target.value);
    fetchProducts({ price,stars:star,brand,processor,ram,color,HDD,SSD:e.target.value,graphics,shipping });
  };

  // 11 on graphics
  const showGraphics = () =>
    graphicss.map((g) => (
      <Radio
        key={g}
        value={g}
        name={g}
        checked={g === graphics}
        onChange={handleGraphics}
        className="pb-1 pl-4 pr-4"
      >
        {g}
      </Radio>
    ));

  const handleGraphics = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setGraphics(e.target.value);
    fetchProducts({ price,stars:star,brand,processor,ram,color,HDD,SSD,graphics:e.target.value,shipping });
  };

  // 12 on shipping
  const showShipping = () =>
    shippings.map((s) => (
      <Radio
        key={s}
        value={s}
        name={s}
        checked={s === shipping}
        onChange={handleShipping}
        className="pb-1 pl-4 pr-4"
      >
        {s}
      </Radio>
    ));

  const handleShipping = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setShipping(e.target.value);
    fetchProducts({ price,stars:star,brand,processor,ram,color,HDD,SSD,graphics,shipping:e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Filter</h4>
          <hr />

          <Menu
            defaultOpenKeys={["1", "2", "3", "4"]}
            mode="inline"
          >
            {/* price */}
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <MoneyCollectOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `Rs${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="150000"
                />
              </div>
            </SubMenu>

            {/* stars */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }}>{showStars()}</div>
            </SubMenu>

            {/* brands */}
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showBrands()}
              </div>
            </SubMenu>

              {/* processor */}
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Processor
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showProcessors()}
              </div>
            </SubMenu>

              {/* ram */}
              <SubMenu
              key="5"
              title={
                <span className="h6">
                  <DownSquareOutlined /> RAM
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showRams()}
              </div>
            </SubMenu>

            {/* HDD */}
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <DownSquareOutlined /> HDD
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showHDDs()}
              </div>
            </SubMenu>

            {/* SSD */}
            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <DownSquareOutlined /> SSD
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showSSDs()}
              </div>
            </SubMenu>

            {/* graphics */}
            <SubMenu
              key="8"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Graphics
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showGraphics()}
              </div>
            </SubMenu>

            {/* colors */}
            <SubMenu
              key="9"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Colors
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showColors()}
              </div>
            </SubMenu>

            {/* shipping */}
            <SubMenu
              key="10"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showShipping()}
              </div>
            </SubMenu>
          </Menu>
        </div>

        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-primary text-center">Products</h4>
          )}

          {products.length < 1 && <p>No products found</p>}

          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
