import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const placeOrder=async(req,res)=>
{
    try
    {
        const newOrder= await prisma.order.create({
            userId:req.body.id,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })

        await newOrder.save()
    }

    catch(error){}
}