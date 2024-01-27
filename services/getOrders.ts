import prisma from '@/libs/prismadb';

export default async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    return orders;
  } catch (error: any) {
    console.log(error);

    throw new Error(error);
  }
}
