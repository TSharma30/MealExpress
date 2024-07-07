import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './List.css';
import { toast } from 'react-toastify';
import { useAdminAuth } from '../../context/AdminContext';
import { motion, AnimatePresence } from 'framer-motion';

const List = () => {
    const { url } = useAdminAuth();
    const [list, setList] = useState([]);
    const [updateItem, setUpdateItem] = useState(null);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const [clickCoords, setClickCoords] = useState({ x: 0, y: 0 });
    const updateDialogRef = useRef(null);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Error fetching the list");
            }
        } catch (error) {
            toast.error("An error occurred while fetching the list");
        }
    };

    const removeFood = async (foodId) => {
        try {
            const response = await axios.delete(`${url}/api/food/remove`, { data: { id: foodId } });
            await fetchList();
            if (response.data.success) {
                toast.success("Food item removed successfully");
            } else {
                toast.error("Error removing food item");
            }
        } catch (error) {
            toast.error("An error occurred while removing the food item");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    const openUpdateDialog = (item, e) => {
        setUpdateItem(item);
        setClickCoords({ x: e.clientX, y: e.clientY });
        setIsUpdateDialogOpen(true);
    };

    const closeUpdateDialog = () => {
        setUpdateItem(null);
        setIsUpdateDialogOpen(false);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${url}/api/food/update`, updateItem);
            if (response.data.success) {
                toast.success("Food item updated successfully");
                await fetchList();
                closeUpdateDialog();
            } else {
                toast.error("Error updating food item");
            }
        } catch (error) {
            toast.error("An error occurred while updating the food item");
        }
    };

    const handleClickOutside = (e) => {
        if (updateDialogRef.current && !updateDialogRef.current.contains(e.target)) {
            closeUpdateDialog();
        }
    };

    useEffect(() => {
        if (isUpdateDialogOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isUpdateDialogOpen]);

    return (
        <div className="list add flex-col">
            <div className="list-table">
                <div className="list-table-format-title">
                    <b className="firstb">Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => (
                    <div key={index} className="list-table-format">
                        <img src={`${url}/images/${item.image}`} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p className="pricing"><i className="ri-money-rupee-circle-fill"></i>{item.price}</p>
                        <p>
                            <i className="ri-close-circle-fill" onClick={() => removeFood(item.id)}></i>
                            <i className="ri-loop-left-line update" onClick={(e) => openUpdateDialog(item, e)}></i>
                        </p>
                    </div>
                ))}
            </div>
            <AnimatePresence>
                {isUpdateDialogOpen && (
                    <motion.div
                        className="update-dialog"
                        ref={updateDialogRef}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{
                            position: 'fixed',
                            top: clickCoords.y,
                            left: clickCoords.x
                        }}
                        transition={{ type: "spring", damping: 15, stiffness: 300 }} // Example spring animation
                    >
                        <motion.form
                            className='update-form'
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            onSubmit={handleUpdate}
                        >
                            <motion.h2
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                MEAL UPDATE
                            </motion.h2>
                            <motion.i
                                className="ri-close-circle-fill close-icon"
                                onClick={closeUpdateDialog}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            />
                            <motion.input
                                type="text"
                                value={updateItem.name}
                                onChange={(e) => setUpdateItem({ ...updateItem, name: e.target.value })}
                                placeholder="Name"
                                required
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            />
                            <motion.select
                                value={updateItem.category}
                                onChange={(e) => setUpdateItem({ ...updateItem, category: e.target.value })}
                                required
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <option value="salad">Salad</option>
                                <option value="noodles">Noodles</option>
                                <option value="Rolls">Rolls</option>
                                <option value="desert">Desert</option>
                                <option value="sandwich">Sandwich</option>
                                <option value="pure-veg">Pure Veg</option>
                                <option value="pasta">Pasta</option>
                                <option value="cake">Cake</option>
                            </motion.select>
                            <motion.input
                                type="number"
                                value={updateItem.price}
                                onChange={(e) => setUpdateItem({ ...updateItem, price: parseInt(e.target.value) })}
                                placeholder="Price"
                                required
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            />
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                                className="update-button"
                            >
                                Update
                            </motion.button>

                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default List;
