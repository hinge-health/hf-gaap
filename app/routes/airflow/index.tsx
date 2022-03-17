import { json, useLoaderData } from 'remix';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import columns, { rows } from './colsHeaders';

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

/**
 * interface AirflowData {
 *  taskId: number;
 *  dagId: number;
 *  client: string;
 *  insurer: string;
 *  paid: boolean;
 *  totals: string;
 * }
 */

const Airflow = () => {
  const title = 'Airflow Overview';
  // data
  const airflowData = useLoaderData();
  console.log(airflowData);

  return (
    <>
      <Typography
        variant='h2'
        sx={{
          textAlign: 'center',
          padding: '2rem'
        }}
      >
        {title}
      </Typography>
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

export default Airflow;
