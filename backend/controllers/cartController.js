import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const addToCart = async (req, res) => {
    try {
        let user = await prisma.user.findUnique({ where: { id: req.body.userId } });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = user.cartData || {};

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await prisma.user.update({
            where: { id: req.body.userId },
            data: { cartData }
        });

        res.json({ success: true, cartData });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const removeFromCart = async (req, res) => {
    try {
        let user = await prisma.user.findUnique({ where: { id: req.body.userId } });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = user.cartData || {};

        if (cartData[req.body.itemId]) {
            cartData[req.body.itemId] -= 1;
            if (cartData[req.body.itemId] <= 0) {
                delete cartData[req.body.itemId];
            }
        } else {
            return res.status(404).json({ success: false, message: "Item not in cart" });
        }

        await prisma.user.update({
            where: { id: req.body.userId },
            data: { cartData }
        });

        res.json({ success: true, cartData });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getCart = async (req, res) => {
    try {
        let user = await prisma.user.findUnique({ where: { id: req.body.userId } });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = user.cartData || {};

        res.json({ success: true, cartData });
    } catch (error) {
        console.error('Error getting cart:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


export { addToCart, removeFromCart, getCart };

