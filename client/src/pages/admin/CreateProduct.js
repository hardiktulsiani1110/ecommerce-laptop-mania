import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "antd";
import {  useSelector } from "react-redux";
import {
    CheckOutlined
  } from '@ant-design/icons';
import {createProduct} from '../../functions/product';
const _ = require('lodash');

const CreateProduct = ({history}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [image, setImage] = useState("");
    const [ram, setRam] = useState("");
    const [HDD, setHDD] = useState("");
    const [SSD, setSSD] = useState("");
    const [graphics, setGraphics] = useState("");
    const [color, setColor] = useState("");
    const [brand, setBrand] = useState("");
    const [loading, setLoading] = useState("");
    const [processor, setProcessor] = useState("");
    const [shipping,setShipping] = useState("");

    const user = useSelector(state => state.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if(title.trim().length === 0){
            toast.error("title shouldnt be empty");
            setLoading(false);
            return ;
        }
        if(description.trim().length === 0){
            toast.error("description shouldnt be empty");
            setLoading(false);
            return ;
        }
        if(price <= 0){
            toast.error("price should be greater than zero");
            setLoading(false);
            return ;
        }
        if(quantity <= 0){
            toast.error("qauntity should be greater than zero");
            setLoading(false);
            return ;
        }
        if(!image){
            toast.error("Image Url missing");
            setLoading(false);
            return ;
        }
        if(!color || color === 'Not Selected'){
            toast.error("select a color");
            setLoading(false);
            return ;
        }
        if(!brand || brand === 'Not Selected'){
            toast.error("select Brand");
            setLoading(false);
            return ;
        }
        if(!processor || processor === 'Not Selected'){
            toast.error("select processor");
            setLoading(false);
            return ;
        }
        if(!ram || ram === 'Not Selected'){
            toast.error("select ram");
            setLoading(false);
            return ;
        }
        if(!HDD || HDD === 'Not Selected'){
            toast.error("select HDD");
            setLoading(false);
            return ;
        }
        if(!SSD || SSD === 'Not Selected'){
            toast.error("select SSD");
            setLoading(false);
            return ;
        }
        if(!graphics || graphics === 'Not Selected'){
            toast.error("select graphics card");
            setLoading(false);
            return ;
        }

        if(!shipping || shipping === 'Not Selected'){
            toast.error("select shipping yes or no");
            setLoading(false);
            return ;
        }
        const product = {
            title,
            description,
            price,
            quantity,
            image,
            ram,
            color,
            brand,
            processor,
            graphics,
            HDD,
            SSD,
            shipping
        }
        createProduct(product,user.token)
            .then(res => {
                // console.log(res);
                toast.success(`${res.data.title} has been created`);
                window.location.reload();
            })
            .catch((err) => {
                // console.log(err);
                toast.error(err.response.data.err);
            });
        
        setLoading(false);
        history.push('/admin/products/');
    };



    const addProduct = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label>Title</label>
            <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product Title"
                autoFocus
                required
            />
            </div>
    
            <div className="form-group">
            <label>Description</label>
            <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product Description"
                required
            />
            </div>
    
            <div className="form-group">
            <label>Price</label>
            <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Product Price"
                required
            />
            </div>

            <div className="form-group">
            <label>Quantity</label>
            <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Product Quantity"
                required
            />
            </div>

            <div className="form-group">
            <label>Image</label>
            <input
                type="url"
                className="form-control"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Product Image"
                required
            />
            </div>

            <div className="form-group">
            <label>Color</label>
                <select value={color} name="color" id="color" className="custom-select custom-select-lg mb-3" onChange={e => setColor(e.target.value)}>
                <option value="Not Selected">Not Selected</option>
                    <option value="black">black</option>
                    <option value="white">white</option>
                    <option value="blue">blue</option>
                    <option value="silver">silver</option>
                </select>
            </div>

            <div className="form-group">
            <label>Brand</label>
                <select value={brand} name="brand" id="brand" className="custom-select custom-select-lg mb-3" onChange={e => setBrand(e.target.value)}>
                <option value="Not Selected">Not Selected</option>
                    <option value="HP">HP</option>
                    <option value="dell">dell</option>
                    <option value="lenovo">lenovo</option>
                    <option value="asus">asus</option>
                </select>
            </div>

            <div className="form-group">
            <label>Processor</label>
                <select value={processor} name="processor" id="processor" className="custom-select custom-select-lg mb-3" onChange={e => setProcessor(e.target.value)}>
                <option value="Not Selected">Not Selected</option>
                    <option value="i3">i3</option>
                    <option value="i5">i5</option>
                    <option value="i7">i7</option>
                    <option value="i9">i9</option>
                </select>
            </div>

            <div className="form-group">
            <label>ram</label>
                <select value={ram} name="ram" id="ram" className="custom-select custom-select-lg mb-3" onChange={e => setRam(e.target.value)}>
                <option value="Not Selected">Not Selected</option>
                    <option value="8GB">8GB</option>
                    <option value="16GB">16GB</option>
                </select>
            </div>

            <div className="form-group">
            <label>HDD</label>
                <select value={HDD} name="HDD" id="HDD" className="custom-select custom-select-lg mb-3" onChange={e => setHDD(e.target.value)}>
                <option value="Not Selected">Not Selected</option>
                    <option value="0GB">0GB</option>
                    <option value="512GB">512GB</option>
                    <option value="1TB">1TB</option>
                    <option value="2TB">2TB</option>
                </select>
            </div>

            <div className="form-group">
            <label>SSD</label>
                <select value={SSD} name="SSD" id="SSD" className="custom-select custom-select-lg mb-3" onChange={e => setSSD(e.target.value)}>
                <option value="Not Selected">Not Selected</option>
                    <option value="0GB">0GB</option>
                    <option value="256GB">256GB</option>
                    <option value="512GB">512GB</option>
                    <option value="1TB">1TB</option>
                </select>
            </div>

            <div className="form-group">
            <label>Graphics</label>
                <select value={graphics} name="graphics" id="graphics" className="custom-select custom-select-lg mb-3" onChange={e => setGraphics(e.target.value)}>
                <option value="Not Selected">Not Selected</option>
                    <option value="Integrated">Integrated</option>
                    <option value="2GB">2GB</option>
                    <option value="4GB">4GB</option>
                    <option value="8GB">8GB</option>
                </select>
            </div>

            <div className="form-group">
            <label>shipping</label>
                <select value={shipping} name="shipping" id="shipping" className="custom-select custom-select-lg mb-3" onChange={e => setShipping(e.target.value)}>
                    <option value="Not Selected">Not Selected</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>

            <br />
            <Button
                onClick={handleSubmit}
                type="primary"
                className="mb-3"
                block
                shape="round"
                icon={<CheckOutlined />}
                size="large"
                >
                Create Product
            </Button>
        </form>
        );

    return (
        <div className="container p-5">
      <div className="row">
      
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Add Product</h4>
          )}
          {addProduct()}
        </div>
      </div>
    </div>
    )
}

export default CreateProduct
