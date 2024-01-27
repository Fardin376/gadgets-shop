import getProducts from '@/services/getProducts';
import StatsSummary from './StatsSummary';
import getOrders from '@/services/getOrders';
import getUsers from '@/services/getUsers';
import Container from '../components/Container';
import BarGraph from './BarGraph';
import getGraphData from '@/services/getGraph';

export const dynamic = 'force-dynamic';

async function Admin() {
  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();
  const graphData = await getGraphData();

  return (
    <div className="admin-page-wrapper">
      <Container>
        <StatsSummary products={products} orders={orders} users={users} />
        <div className="graph-wrapper">
          <BarGraph data={graphData} />
        </div>
      </Container>
    </div>
  );
}
export default Admin;
