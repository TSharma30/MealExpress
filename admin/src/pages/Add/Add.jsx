import React, { useState } from 'react';
import axios from 'axios';
import './Add.css';

const Add = ({url}) => {
   
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("category", data.category);
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
                console.log("success");
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                });
                setImage(false);
            } else {
                console.log(response.data.error);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <div className="add">
            <form onSubmit={onSubmitHandler} className="flex-col">
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : "https://cdn.icon-icons.com/icons2/1880/PNG/512/iconfinder-upload-4341320_120532.png"} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input
                        type="text"
                        name="name"
                        placeholder="Type here"
                        value={data.name}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea
                        name="description"
                        rows="6"
                        placeholder="Write content here"
                        value={data.description}
                        onChange={onChangeHandler}
                    ></textarea>
                </div>
                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input
                        type="number"
                        name="price"
                        placeholder="Rs"
                        value={data.price}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select
                        name="category"
                        value={data.category}
                        onChange={onChangeHandler}
                    >
                        <option value="salad">Salad</option>
                        <option value="noodles">Noodles</option>
                        <option value="role">Role</option>
                        <option value="desert">Desert</option>
                        <option value="sandwich">Sandwich</option>
                        <option value="pure-veg">Pure Veg</option>
                        <option value="pasta">Pasta</option>
                        <option value="cake">Cake</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <button type="submit" className="add-btn">ADD</button>
                </div>
            </form>
        </div>
    );
};

export default Add;
