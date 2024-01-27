import prisma from '@/libs/prismadb';

interface IParams {
  orderId?: string;
}

export const dynamic = 'force-dynamic';

export default async function getOrderById(params: IParams) {
  try {
    const { orderId } = params;

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: true,
      },
    });

    if (!order) {
      return null;
    }

    return order;
  } catch (error: any) {
    throw new Error(error);
  }
}
