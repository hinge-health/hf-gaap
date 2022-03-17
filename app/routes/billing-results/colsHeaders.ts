import { GridColDef } from '@mui/x-data-grid';
import generateLink, { isSuccessful } from './lib';

interface Row {
  id: number;
  taskId: number;
  dagId: number;
  jobName: string;
  status: string;
  totals: number;
  executionDate: string;
  success: boolean;
  logs: any; // url
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
    field: 'jobName',
    headerName: 'Job Name',
    width: 350,
    editable: true
  },

  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    description: `transaction status to either be 'in progress' or 'completed'`
  },
  {
    field: 'totals',
    headerName: 'Totals',
    sortable: false,
    type: 'number',
    width: 150,
    valueFormatter: params => {
      return params.value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      });
    }
  },
  {
    field: 'executionDate',
    headerName: 'Execution Date',
    type: 'dateTime',
    width: 250
  },
  {
    field: 'success',
    headerName: 'Success',
    type: 'boolean',
    editable: true,
    width: 90
  },
  {
    field: 'logs',
    headerName: 'Logs',
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
    jobName: 'Tom Nook',
    status: 'in progress',
    totals: 1200000,
    executionDate: '3/16/2022, 2:43:22 AM',
    success: isSuccessful('total'),
    logs: 'islandhomeparadise@scam.com'
  },
  {
    id: 2,
    taskId: 13,
    dagId: 1,
    jobName: 'Aurora',
    status: 'complete',
    totals: 1200000,
    executionDate: '3/16/2022, 2:43:22 AM',
    success: isSuccessful('total'),
    logs: 'placeholder@here.com'
  }
];

export { columns, rows };
