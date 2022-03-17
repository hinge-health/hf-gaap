import { useEffect } from 'react';
import { useInterval } from '~/useInterval';
import { api } from '~/api';

import { json, useLoaderData } from 'remix';
import { Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { columns, rows } from './colsHeaders';

const POLLING_FREQ_MS = 5000;

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

  useInterval(async () => {
    const dagRunReq = await api('api/v0/submissions/generate_bills/1');
    const dagRunData = await dagRunReq.json();
    console.log('polling');
    console.log(dagRunData);

    // we'll need to store the dag run in state and update the corresponding dag run
    // in state with the response data from this poller
  }, POLLING_FREQ_MS);
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
