import { GridColDef } from '@mui/x-data-grid';
import generateLink, { isSuccessful } from './lib';

interface Row {
  id: number;
  taskId: number;
  dagId: string;
  jobName: string;
  status: string;
  totals: number;
  executionDate: string;
  billingCycle: string;
  success: boolean;
  logs: any; // url
}

const columns: Array<GridColDef> = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'dagRunId',
    headerName: 'Task Id',
    type: 'string',
    width: 200,
    editable: true
  },
  {
    field: 'dagName',
    headerName: 'Dag Id',
    type: 'string',
    width: 200,
    editable: true,
    description: `Airflow's dagId`
  },
  {
    field: 'client',
    headerName: 'Client',
    type: 'string',
    width: 200,
    editable: true,
    description: `Airflow's dagId`
  },
  {
    field: 'partnership',
    headerName: 'Partnership',
    type: 'string',
    width: 200,
    editable: true,
    description: `Airflow's dagId`
  },
  {
    field: 'dagState',
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
    // valueFormatter: params => {
    //   return params.value.toLocaleString('en-US', {
    //     style: 'currency',
    //     currency: 'USD'
    //   });
    // }
  },
  {
    field: 'submissionDatetime',
    headerName: 'Execution Date',
    type: 'dateTime',
    width: 250
  },
  {
    field: 'billingCycle',
    headerName: 'Billing Cycle',
    width: 50
  },
  {
    field: 'billingType',
    headerName: 'Billing Type',
    width: 50
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
    billingCycle: 'string',
    billingType: 'chronic',
    client: 'string',
    limit: 0,
    insurerId: 0,
    mode: 'submission',
    partnership: 'string',
    dagState: 'submitted',
    dagName: 'generate_bills',
    dagRunId: 'manual__2022-03-18T07:26:48.151853+00:00',
    id: 9,
    submissionDatetime: '2022-03-18T07:26:48.204175',
    report: null
  },

];

export { columns, rows };
