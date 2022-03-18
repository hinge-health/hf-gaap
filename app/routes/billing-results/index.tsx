import { useState } from 'react';
import { useInterval } from '~/useInterval';
import { api } from '~/api';

import { json, useLoaderData } from 'remix';
import { Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { columns, constructRows, rows } from './colsHeaders';
import ErrorMessage from './errorMessage';

const POLLING_FREQ_MS = 5000;

export const loader = async () => {
  const submissionsUrl = `api/v0/claims`;

  const results = await api(submissionsUrl, { method: 'GET' });

  const resultsJSON = await results.json();

  return json(resultsJSON);
};

const BillingResults = async data => {
  const title = 'Billing Results Overview';
  const summary =
    'Overview of pulling data from Airflow. Perhaps some instructions can go here.';

  const [error, setError] = useState<null | Error>(null);

  // useInterval(async () => {
  //   const dagRunReq = await api('api/v0/submissions/generate_bills/1');
  //   const dagRunData = await dagRunReq.json();
  //   console.log('polling');
  //   console.log(dagRunData);

  //   // we'll need to store the dag run in state and update the corresponding dag run
  //   // in state with the response data from this poller
  // }, POLLING_FREQ_MS);

  // data
  const airflowData = useLoaderData();
  console.log({ airflowData });

  const handleErrorTest = () => {
    const err = new Error('Error test!');
    setError(err);
  };

  const handleClearError = () => {
    setError(null);
  };

  const constructedRows = constructRows(data);

  return error ? (
    ErrorMessage({ error, handleClear: handleClearError })
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
          variant='contained'
          sx={{
            margin: '0 3rem',
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
          rows={constructedRows}
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
