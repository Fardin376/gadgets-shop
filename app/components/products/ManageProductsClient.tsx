'use client';

import { Product } from '@prisma/client';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { formatPrice } from '@/utils/utils';
import Heading from '@/app/components/Heading';
import Status from '@/app/components/Status';
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from 'react-icons/md';
import ActionBtn from '@/app/components/ActionBtn';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import firebaseApp from '@/libs/firebase';

function ManageProductsClient({ products }: { products: Product[] }) {
  const router = useRouter();
  const storage = getStorage(firebaseApp);

  let rows: any = [];

  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'name', headerName: 'Name', width: 220 },
    {
      field: 'price',
      headerName: 'Price(USD)',
      width: 100,
      renderCell: (params) => {
        return <div className="data-table-price">{params.row.price}</div>;
      },
    },
    { field: 'category', headerName: 'Category', width: 120 },
    { field: 'brand', headerName: 'Brand', width: 80 },
    {
      field: 'inStock',
      headerName: 'In Stock',
      width: 130,
      renderCell: (params) => {
        return (
          <div className="data-table-price">
            {params.row.inStock === true ? (
              <Status
                text="In Stock"
                icon={MdDone}
                bg="product-in-stock"
                color="product-in-stock"
              />
            ) : (
              <Status
                text="Out Of Stock"
                icon={MdClose}
                bg="product-out-of-stock"
                color="product-out-of-stock"
              />
            )}
          </div>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="table-action-btn-wrapper">
            <ActionBtn
              icon={MdCached}
              onClick={() => {
                handleToggleStock(params.row.id, params.row.inStock);
              }}
            />
            <ActionBtn
              icon={MdDelete}
              onClick={() => {
                handleDelete(params.row.id, params.row.images);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/product/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleToggleStock = (id: string, inStock: boolean) => {
    axios
      .put('/api/product', {
        id,
        inStock: !inStock,
      })
      .then((res) => {
        toast.success('Product status changed');
        router.refresh();
      })
      .catch((err) => {
        toast.error('Something went wrong');
        console.log(err);
      });
  };

  const handleDelete = async (id: string, images: any[]) => {
    toast('Deleting product, please wait...');

    const handleDeleteImage = async () => {
      try {
        for (const item of images) {
          if (item.image) {
            const imageRef = ref(storage, item.image);
            await deleteObject(imageRef);
            console.log('image deleted', item.image);
          }
        }
      } catch (error) {
        return console.log('Error deleting image', error);
      }
    };

    await handleDeleteImage();

    axios
      .delete(`/api/product/${id}`)
      .then((res) => {
        toast.success('Product deleted');
        router.refresh();
      })
      .catch((error) => {
        toast.error('Failed to delete product');
        console.log(error);
      });
  };

  return (
    <div className="manage-products-table-wrapper">
      <div className="manage-products-table-header">
        <Heading title="Manage Products" center />
      </div>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
}
export default ManageProductsClient;
