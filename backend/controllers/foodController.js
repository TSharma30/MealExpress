import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import fs from "fs"



const addFood = async (req, res) => {
    const { name, description, price, category } = req.body;
    const image_filename = req.file.filename; // Access filename from req.file

    // Parse price to ensure it's a number
    const parsedPrice = parseInt(price);

    if (isNaN(parsedPrice)) {
        return res.status(400).json({ success: false, message: "Invalid price format" });
    }

    try {
        const food = await prisma.food.create({
            data: {
                name,
                description,
                price: parsedPrice,
                category,
                image: image_filename
            }
        });

        res.json({ success: true, message: "Food Added", data: food });
    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({ success: false, message: "Error adding food" });
    }
};

const listFood = async (req, res) => {
    try {
        const foods = await prisma.food.findMany();
        res.status(200).json({ success: true, data: foods });
    } catch (error) {
        console.error("Error listing foods:", error);
        res.status(500).json({ success: false, message: "Failed to fetch foods" });
    }
};

const removeFood = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: "Invalid food id" });
    }

    try {
        const item = await prisma.food.findUnique({
            where: {
                id: parseInt(id, 10) // Ensure id is parsed to an integer
            }
        });

        if (item) {
            fs.unlink(`uploads/${item.image}`, (err) => {
                if (err) {
                    console.error("Error deleting image file:", err);
                }
            });

            await prisma.food.delete({
                where: {
                    id: item.id
                }
            });

            res.status(200).json({ success: true, message: "Food deleted" });
        } else {
            res.status(404).json({ success: false, message: "Food not found" });
        }
    } catch (error) {
        console.error("Error removing food:", error);
        res.status(500).json({ success: false, message: "Error removing food" });
    }
};


const updateFood = async (req, res) => {
    const { id, name, description, price, category } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: "Invalid food id" });
    }

    try {
        const updatedFood = await prisma.food.update({
            where: {
                id: parseInt(id, 10)
            },
            data: {
                name,
                description,
                price: parseInt(price),
                category
            }
        });

        res.status(200).json({ success: true, message: "Food updated", data: updatedFood });
    } catch (error) {
        console.error("Error updating food:", error);
        res.status(500).json({ success: false, message: "Error updating food" });
    }
};

export { addFood, listFood, removeFood, updateFood };


