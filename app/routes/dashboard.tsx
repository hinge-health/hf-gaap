import { Tabs, Tab } from '@mui/material';
import { useMatch } from 'react-router';
import { Outlet, useNavigate } from 'remix';

const Dashboard = () => {
  const nav = useNavigate();
  const match = useMatch('/dashboard/:pattern');

  return (
    <div>
      <Tabs value={match?.params?.pattern}>
        <Tab
          value='invoices'
          label='Invoices'
          onClick={() => {
            nav('invoices?page=0&pageSize=20');
          }}
        />
        <Tab
          value='claims'
          label='Claims'
          onClick={() => {
            nav('claims?page=0&pageSize=20');
          }}
        />
      </Tabs>
      <Outlet />
    </div>
  );
};

export default Dashboard;
