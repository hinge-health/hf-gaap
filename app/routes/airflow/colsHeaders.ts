import { GridColDef } from '@mui/x-data-grid';
import generateLink, { isSuccessful } from './lib';

interface Row {
  id: number;
  taskId: number;
  dagId: number;
  client: string;
  insurer: string;
  status: string;
  totals: string;
  executionDate: string;
  success: boolean;
  logs: any;
}

const columns: Array<GridColDef> = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'taskId',
    headerName: 'Task Id',
    type: 'number',
    width: 70,
    editable: true
  },
  {
    field: 'dagId',
    headerName: 'Dag Id',
    type: 'number',
    width: 90,
    editable: true,
    description: `Airflow's dagId`
  },
  {
    field: 'client',
    headerName: 'Client',
    width: 300,
    editable: true
  },
  {
    field: 'insurer',
    headerName: 'Insurer',
    width: 300,
    editable: true
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    editable: true
  },
  {
    field: 'totals',
    headerName: 'Totals',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150
  },
  {
    field: 'executionDate',
    headerName: 'Execution Date',
    description: 'This column has a value getter and is not sortable.',
    type: 'dateTime',
    width: 150
  },
  {
    field: 'success',
    headerName: 'Success',
    description: 'This column has a value getter and is not sortable.',
    type: 'boolean',
    editable: true,
    width: 90
  },
  {
    field: 'logs',
    headerName: 'Logs',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 300,
    renderCell: param => generateLink(param)
  }
];

const rows: Array<Row> = [
  {
    id: 1,
    taskId: 10,
    dagId: 1,
    client: 'Tom Nook',
    insurer: 'Isabella Inc.',
    status: 'in progress',
    totals: '$1,200,000',
    executionDate: '3/16/2022, 2:43:22 AM',
    success: isSuccessful('total'),
    logs: 'islandhomeparadise@scam.com'
  },
  {
    id: 2,
    taskId: 13,
    dagId: 1,
    client: 'Aurora',
    insurer: 'Isabella Inc.',
    status: 'complete',
    totals: '$1,200,000',
    executionDate: '3/16/2022, 2:43:22 AM',
    success: isSuccessful('total'),
    logs: 'placeholder@here.com'
  }
];

export { columns, rows };
