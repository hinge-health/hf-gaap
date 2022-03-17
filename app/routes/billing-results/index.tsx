import { useEffect } from 'react';
import { useSocket } from '~/context';

import { json, useLoaderData } from 'remix';
import { Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { columns, rows } from './colsHeaders';

export const loader = async () => {
  return json([
    {
      id: 1,
      url: 'My First Post',
      taskId: 1,
      dagId: 2,
      executionDate: 'some string'
    },
    {
      id: 2,
      url: 'My Second Post',
      taskId: 1,
      dagId: 2,
      executionDate: 'some string'
    }
  ]);
};

const BillingResults = () => {
  const title = 'Billing Results Overview';
  const summary =
    'Overview of pulling data from Airflow. Perhaps some instructions can go here.';

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('event', data => {
      console.log(data);
    });

    socket.emit('event', 'ping');
  }, [socket]);
  // data
  const airflowData = useLoaderData();
  console.log(airflowData);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Typography
          variant='h2'
          sx={{
            padding: '1rem'
          }}
        >
          {title}
        </Typography>
        <Button onClick={() => socket?.emit('event', 'ping')}>
          Websocket test
        </Button>
        <Typography
          variant='subtitle1'
          sx={{
            paddingBottom: '2rem'
          }}
        >
          {summary}
        </Typography>
      </div>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </>
  );
};

export default BillingResults;
