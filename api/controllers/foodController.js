import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

export default addFood;
