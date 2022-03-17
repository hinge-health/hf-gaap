import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  Toolbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
  TextField,
  Box,
  Chip
} from '@mui/material';
import { blue, green, yellow, red, grey } from '@mui/material/colors';
import { useState } from 'react';
import { json, useLoaderData, useNavigate, useSearchParams } from 'remix';
import { api } from '~/api';

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page'), 10) || 0;
  const pageSize = parseInt(url.searchParams.get('pageSize'), 10) || 20;
  const state = url.searchParams.get('state') || '';
  const client = url.searchParams.get('client') || '';
  const submission = url.searchParams.get('submission') || '';
  const type = url.searchParams.get('type') || 'invoice';
  const skip = page * pageSize;
  let totalUrl = `api/v0/claims/total?billing_type=${type}`;
  let listUrl = `api/v0/claims?skip=${skip}&limit=${pageSize}&billing_type=${type}`;

  if (state && state !== 'none') {
    listUrl = `${listUrl}&state=${state}`;
    totalUrl = `${totalUrl}&state=${state}`;
  }

  if (client && client !== '') {
    listUrl = `${listUrl}&client_id=${client}`;
    totalUrl = `${totalUrl}&client_id=${client}`;
  }

  if (submission && submission !== 'none') {
    listUrl = `${listUrl}&submission_type=${submission}`;
    totalUrl = `${totalUrl}&submission_type=${submission}`;
  }

  const claimsData = await api(listUrl, {
    method: 'GET'
  });
  const total = await api(totalUrl, { method: 'GET' });
  const clients = await api(`api/v0/entities/clients`, { method: 'GET' });

  const totalJSON = await total.json();
  const data = await claimsData.json();
  const clientsJSON = await clients.json();

  return json({
    total: totalJSON.total,
    claims: data,
    clients: clientsJSON
  });
};

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'charge', label: 'Charge' },
  { id: 'billing_month', label: 'Billing Month' },
  { id: 'state', label: 'State' }
];

const types = [
  { value: 'invoice', label: 'Invoices' },
  { value: 'claim', label: 'Claims' }
]

const claimStates = [
  { value: 'none', label: 'None' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'canceled', label: 'Canceled' },
  { value: 'archived', label: 'Archived' },
  { value: 'write_off', label: 'Write-Off' }
];

const submissionTypes = [
  { value: 'none', label: 'None' },
  { value: 'disabled', label: 'Disabled' },
  { value: 'auto', label: 'Auto' },
  { value: 'manual', label: 'Manual' }
];

const buildNavUrl = pairs => {
  return `?${pairs
    .reduce((acc, [key, value]) => {
      const isNullish = typeof value === 'undefined' || value === null;

      return !isNullish ? [...acc, `${key}=${value}`] : acc;
    }, [])
    .join('&')}`;
};

const StateChip = ({ state }) => {
  const stateToColor = {
    'submitted': green[300],
    'write_off': blue[300],
    'canceled': red[300],
    'archived': grey[300],
    'scheduled': yellow[300]
  }[state];

  return <Chip label={state} size='small' sx={{ backgroundColor: stateToColor }}/>;
};

const ClaimsTable = ({ claims, total, clients }) => {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const handleTypeChange = (event) => {
    nav(
      buildNavUrl([
        ['type', event.target.value],
        ['page', 0],
        ['pageSize', rowsPerPage],
        ['client', client],
        ['state', claimState === 'none' ? null : claimState],
        ['submission', submission === 'none' ? null : submission]
      ])
    );
  };
  const handlePageChange = (event, newPage: number) => {
    nav(
      buildNavUrl([
        ['type', type],
        ['page', newPage],
        ['pageSize', rowsPerPage],
        ['client', client],
        ['state', claimState === 'none' ? null : claimState],
        ['submission', submission === 'none' ? null : submission]
      ])
    );
  };
  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const handleClaimStateChange = event => {
    const cs = event.target.value;
    nav(
      buildNavUrl([
        ['type', type],
        ['page', 0],
        ['pageSize', rowsPerPage],
        ['client', client],
        ['state', cs === 'none' ? null : cs],
        ['submission', submission === 'none' ? null : submission]
      ])
    );
  };
  const handleSubmissionChange = event => {
    const sub = event.target.value;
    nav(
      buildNavUrl([
        ['type', type],
        ['page', 0],
        ['pageSize', rowsPerPage],
        ['client', client],
        ['state', claimState === 'none' ? null : claimState],
        ['submission', sub === 'none' ? null : sub]
      ])
    );
  };
  const handleClientChange = (event, value) => {
    nav(
      buildNavUrl([
        ['type', type],
        ['page', 0],
        ['pageSize', rowsPerPage],
        ['client', value ? value.id : null],
        ['state', claimState === 'none' ? null : claimState],
        ['submission', submission === 'none' ? null : submission]
      ])
    );
  };
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page'), 10);
  const type = searchParams.get('type') || 'invoice';
  const claimState = searchParams.get('state') || 'none';
  const submission = searchParams.get('submission') || 'none';
  const client = searchParams.get('client') || null;
  const toRender = claims;

  return (
    <Paper>
      <Box p={1} style={{ flex: 1 }}>
        <Toolbar variant='dense'>
        <FormControl>
            <InputLabel id='type-label'>Billing</InputLabel>
            <Select
              id='type'
              label='Type'
              labelId='type-label'
              value={type}
              onChange={handleTypeChange}
              sx={{ width: 150, marginRight: '1em' }}
            >
              {types.map(cs => (
                <MenuItem key={cs.value} value={cs.value}>
                  {cs.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id='claim-state-label'>State</InputLabel>
            <Select
              id='claim-state'
              label='State'
              labelId='claim-state-label'
              value={claimState}
              onChange={handleClaimStateChange}
              sx={{ width: 150, marginRight: '1em' }}
            >
              {claimStates.map(cs => (
                <MenuItem key={cs.value} value={cs.value}>
                  {cs.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id='submission-type-label'>Submission Type</InputLabel>
            <Select
              id='submission-type'
              label='Submission Type'
              labelId='submission-type-label'
              value={submission}
              onChange={handleSubmissionChange}
              sx={{ width: 150, marginRight: '1em' }}
            >
              {submissionTypes.map(cs => (
                <MenuItem key={cs.value} value={cs.value}>
                  {cs.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Autocomplete
            id='client-search'
            value={clients.find(c => String(c.id) === client) || null}
            onChange={handleClientChange}
            options={clients}
            isOptionEqualToValue={(option, value) =>
              String(option.id) === value
            }
            getOptionLabel={option => option.name}
            sx={{ width: 300 }}
            renderInput={params => <TextField {...params} label='Client' />}
          />
        </Toolbar>
      </Box>
      <TableContainer>
        <Table size='small' stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map(c => (
                <TableCell key={c.id}>{c.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {toRender.map(c => (
              <TableRow key={c.id}>
                <TableCell>{c.claimIdentifier}</TableCell>
                <TableCell>{c.charge}</TableCell>
                <TableCell>{c.billingMonth}</TableCell>
                <TableCell><StateChip state={c.state}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20]}
        component='div'
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Paper>
  );
};

const Dashboard = () => {
  const data = useLoaderData();
  return (
    <ClaimsTable
      claims={data.claims}
      total={data.total}
      clients={data.clients}
    />
  );
};

export default Dashboard;
