import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createOrder = async (req, res) => {
  const { items, totalAmount, deliveryInfo } = req.body;
  const userId = req.body.userId ; 
  try {
 
    const cartItems = JSON.parse(items);
    const foodIds = Object.keys(cartItems).map(Number);
    const foodItems = await prisma.food.findMany({
      where: { id: { in: foodIds } }
    });

    // Recalculate total amount and create orderItems
    let calculatedTotalAmount = 0;
    const orderItems = foodItems.map(item => {
      const quantity = cartItems[item.id];
      const itemTotal = item.price * quantity;
      calculatedTotalAmount += itemTotal;
      return {
        foodId: item.id,
        name: item.name,
        price: item.price,
        quantity: quantity,
        total: itemTotal
      };
    });

    // Create the order
    const order = await prisma.order.create({
      data: {
        userId,
        items: JSON.stringify(orderItems),
        totalAmount,
        deliveryInfo: JSON.stringify(deliveryInfo),
        status: "Preparing"
      },
    });

    // Clear the user's cart
    await prisma.user.update({
      where: { id: userId },
      data: { cartData: null },
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  const { userId } = req.body;
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, email: true } } },
    });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: { status },
    });
    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
