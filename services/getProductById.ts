import prisma from '@/libs/prismadb';

export const dynamic = 'force-dynamic';

export default async function getProductById(params: { productId?: string }) {
  try {
    const { productId } = params;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: 'desc',
          },
        },
      },
    });

    if (!product) {
      return null;
    }

    return product
  } catch (error: any) {
    throw new Error(error);
  }
}
