import prisma from '@/libs/prismadb';
import moment from 'moment';

export const dynamic = 'force-dynamic';

export default async function getGraphData() {
  try {
    //get start and end data for the data range(last 7 days)
    const startDate = moment().subtract(6, 'days').startOf('day');
    const endDate = moment().endOf('day');

    //query the database to get order data grouped by createdDate
    const result = await prisma.order.groupBy({
      by: ['createdDate'],
      where: {
        createdDate: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: 'complete',
      },
      _sum: {
        amount: true,
      },
    });

    //Initialize an object to aggregate the data by day
    const aggregatedData: {
      [day: string]: { day: string; date: string; totalAmount: number };
    } = {};

    //Create a clone of the start date to iterate over each day
    const currentDate = startDate.clone();

    //Iterate over each day in the date range
    while (currentDate <= endDate) {
      //format the day as a string(e.g. 'Monday')
      const day = currentDate.format('dddd');
      console.log('day<<<', day, currentDate);

      //Initialize the aggregated data for the day with the day, date, and total amount
      aggregatedData[day] = {
        day,
        date: currentDate.format('YYYY-MM-DD'),
        totalAmount: 0,
      };

      //move to the next day
      currentDate.add(1, 'day');
    }

    //Calculate the total amount for each day by summing the order amounts
    result.forEach((entry) => {
      const day = moment(entry.createdDate).format('dddd');
      const amount = entry._sum.amount || 0;

      aggregatedData[day].totalAmount += amount;
    });

    //Convert the aggregated data object into an array and sort it by date
    const formattedData = Object.values(aggregatedData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );

    //Return the formatted data
    return formattedData;
  } catch (error: any) {
    throw new Error(error);
  }
}