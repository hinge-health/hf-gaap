import { useEffect, useState } from 'react';
import { useSocket } from '~/context';

import { json, useLoaderData } from 'remix';
import { Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { columns, rows } from './colsHeaders';
import ErrorMessage from './errorMessage';

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

  const [error, setError] = useState<null | Error>(null);

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    if (socket.onerror) setError(socket.onerror);

    console.log(socket);
    socket.onmessage = message => {
      console.log(message);
    };
  }, [socket]);

  // data
  const airflowData = useLoaderData();
  console.log(airflowData);

  const handleErrorTest = () => {
    const err = new Error('Error test!');
    setError(err);
  };

  return error ? (
    ErrorMessage(error)
  ) : (
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
        <Button
          onClick={() => {
            socket.send('ping!');
          }}
        >
          Websocket test
        </Button>

        <Button
          sx={{
            color: 'red'
          }}
          onClick={handleErrorTest}
        >
          Error test
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

      <div style={{ height: '60rem', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={25}
          checkboxSelection
          disableSelectionOnClick
          // not sure what this will do but the docs state: "An error that will turn the grid into its error state and display the error component."
          error={error}
        />
      </div>
    </>
  );
};

export default BillingResults;
