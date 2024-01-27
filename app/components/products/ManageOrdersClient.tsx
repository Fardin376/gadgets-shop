'use client';

import { Order, User } from '@prisma/client';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { formatPrice } from '@/utils/utils';
import Heading from '@/app/components/Heading';
import Status from '@/app/components/Status';
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from 'react-icons/md';
import ActionBtn from '@/app/components/ActionBtn';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import Error from '../Error';

type ExtendedOrder = Order;
type users = User;

function ManageOrdersClient({
  orders,
  users,
}: {
  orders: ExtendedOrder[];
  users: users[];
}) {
  const router = useRouter();

  let rows: any = [];

  if (!orders || orders.length === 0) {
    return <Error title="You have no orders" />;
  }

  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: users.find((user) => user.id === order.userId)?.name,
        amount: formatPrice(order.amount / 100),
        paymentStatus: order.status,
        date: moment(order.createdDate).fromNow(),
        deliveryStatus: order.deliveryStatus,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'customer', headerName: 'Customer Name', width: 130 },
    {
      field: 'amount',
      headerName: 'Amount(USD)',
      width: 130,
      renderCell: (params) => {
        return <div className="data-table-price">{params.row.amount}</div>;
      },
    },
    {
      field: 'paymentStatus',
      headerName: 'Payment Status',
      width: 130,
      renderCell: (params) => {
        return (
          <div className="data-table-price">
            {params.row.paymentStatus === 'pending' ? (
              <Status
                text="Pending"
                icon={MdAccessTimeFilled}
                bg="product-pending"
                color="product-pending"
              />
            ) : params.row.paymentStatus === 'complete' ? (
              <Status
                text="Completed"
                icon={MdDone}
                bg="product-delivered"
                color="product-delivered"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: 'deliveryStatus',
      headerName: 'Delivery Status',
      width: 130,
      renderCell: (params) => {
        return (
          <div className="data-table-price">
            {params.row.deliveryStatus === 'pending' ? (
              <Status
                text="Pending"
                icon={MdAccessTimeFilled}
                bg="product-pending"
                color="product-pending"
              />
            ) : params.row.deliveryStatus === 'dispatched' ? (
              <Status
                text="Dispatched"
                icon={MdDeliveryDining}
                bg="product-dispatched"
                color="product-dispatched"
              />
            ) : params.row.deliveryStatus === 'delivered' ? (
              <Status
                text="Delivered"
                icon={MdDone}
                bg="product-delivered"
                color="product-delivered"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 130,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="table-action-btn-wrapper">
            <ActionBtn
              icon={MdDeliveryDining}
              onClick={() => {
                handleDispatch(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdDone}
              onClick={() => {
                handleDeliver(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleDispatch = (id: string) => {
    axios
      .put('/api/order', {
        id,
        deliveryStatus: 'dispatched',
      })
      .then((res) => {
        toast.success('Order Dispatched');
        router.refresh();
      })
      .catch((err) => {
        toast.error('Something went wrong');
        console.log(err);
      });
  };

  const handleDeliver = (id: string) => {
    axios
      .put('/api/order', {
        id,
        deliveryStatus: 'delivered',
      })
      .then((res) => {
        toast.success('Order Delivered');
        router.refresh();
      })
      .catch((err) => {
        toast.error('Something went wrong');
        console.log(err);
      });
  };

  return (
    <div className="manage-products-table-wrapper">
      <div className="manage-products-table-header">
        <Heading title="Manage Orders" center />
      </div>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
}
export default ManageOrdersClient;
