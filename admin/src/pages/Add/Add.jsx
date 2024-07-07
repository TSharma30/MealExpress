import React, { useState } from 'react';
import axios from 'axios';
import './Add.css';
import { useAdminAuth } from '../../context/AdminContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toastify

const Add = () => {
    const { url } = useAdminAuth(); // Accessing URL from the context
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
                toast.success("Item added successfully!");
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                });
                setImage(false);
            } else {
                toast.error(response.data.error);
            }
        } catch (error) {
            toast.error("An error occurred while adding the item");
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
                        <option value="Salad">Salad</option>
                        <option value="Noodles">Noodles</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Desert</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Pure veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Cake">Cake</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <button type="submit" className="add-btn">ADD</button>
                </div>
            </form>
            <ToastContainer /> {/* Add ToastContainer for toast notifications */}
        </div>
    );
};

export default Add;
