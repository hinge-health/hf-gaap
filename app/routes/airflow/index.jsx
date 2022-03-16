import { json, useLoaderData } from 'remix';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

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
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'taskId',
    headerName: 'Task Id',
    type: 'number',
    width: 150,
    editable: true
  },
  {
    field: 'dagId',
    headerName: 'Dag Id',
    type: 'number',
    width: 150,
    editable: true
  },
  {
    field: 'client',
    headerName: 'Client',
    width: 350,
    editable: true
  },
  {
    field: 'insurer',
    headerName: 'Insurer',
    width: 350,
    editable: true
  },
  {
    field: 'paid',
    headerName: 'Paid',
    width: 90,
    type: 'boolean',
    editable: false
  },
  {
    field: 'totals',
    headerName: 'Totals',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200
  }
];

const rows = [
  {
    id: 1,
    taskId: 10,
    dagId: 1,
    client: 'Tom Nook',
    insurer: 'Isabella Inc.',
    paid: false,
    totals: '$1,200,000'
  },
  {
    id: 2,
    taskId: 13,
    dagId: 1,
    client: 'Aurora',
    insurer: 'Isabella Inc.',
    paid: true,
    totals: '$1,200,000'
  }
];

const Airflow = () => {
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
        Aiflow Page
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
