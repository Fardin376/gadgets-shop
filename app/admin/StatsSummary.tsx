'use client';

import { Order, Product, User } from '@prisma/client';
import { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import { formatNumber, formatPrice } from '@/utils/utils';

type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};

function StatsSummary({
  orders,
  products,
  users,
}: {
  orders: Order[];
  products: Product[];
  users: User[];
}) {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    sale: {
      label: 'Total Sale',
      digit: 0,
    },
    products: {
      label: 'Total Products',
      digit: 0,
    },
    orders: {
      label: 'Total Orders',
      digit: 0,
    },
    paidOrders: {
      label: 'Paid Orders',
      digit: 0,
    },
    unpaidOrders: {
      label: 'Unpaid Orders',
      digit: 0,
    },
    users: {
      label: 'Total Users',
      digit: 0,
    },
  });

  useEffect(() => {
    setSummaryData((prev) => {
      let tempData = { ...prev };

      const totalSale = orders.reduce((acc, item) => {
        if (item.status === 'complete') {
          return acc + item.amount / 100;
        } else return acc;
      }, 0);

      const paidOrders = orders.filter((order) => {
        return order.status === 'complete';
      });

      const unpaidOrders = orders.filter((order) => {
        return order.status === 'pending';
      });

      tempData.sale.digit = totalSale;
      tempData.orders.digit = orders.length;
      tempData.paidOrders.digit = paidOrders.length;
      tempData.unpaidOrders.digit = unpaidOrders.length;
      tempData.products.digit = products.length;
      tempData.users.digit = users.length;

      return tempData;
    });
  }, [orders, products, users]);

  const summaryKeys = Object.keys(summaryData);

  return (
    <div className="stats-summary-wrapper">
      <div className="stats-heading">
        <Heading title="Statistics" center />
      </div>
      <div className="stats-summary-grid">
        {summaryKeys &&
          summaryKeys.map((key) => {
            return (
              <div key={key} className="summary-data-wrap">
                <div className="summary-data-label ">
                  {summaryData[key].label === 'Total Sale' ? (
                    <>{formatPrice(summaryData[key].digit)}</>
                  ) : (
                    <>{formatNumber(summaryData[key].digit)}</>
                  )}
                </div>
                <div>{summaryData[key].label}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
export default StatsSummary;
