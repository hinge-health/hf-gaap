import { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Autocomplete,
  TextField,
  Button,
  Grid,
  Box,
  FormLabel
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';

import { json, useLoaderData, Form } from 'remix';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { api, dagApi } from '~/api';

const DAG_ID = "generate_bills";

export const loader = async () => {
  const partnershipsReq = await api('api/v0/entities/partnerships', {
    method: 'GET'
  });
  const clientsReq = await api('api/v0/entities/clients', {
    method: 'GET'
  });
  const insurersReq = await api('api/v0/entities/insurers', {
    method: 'GET'
  });

  const dagTest = await dagApi('api/v1/dags/generate_bills', {
    method: 'GET'
  });
  console.log(dagTest);

  console.log(await dagTest.json());

  const partnerships = await partnershipsReq.json();
  const clients = await clientsReq.json();
  const insurers = await insurersReq.json();

  return json({
    modes: ['preview', 'submisison'],
    partnerships,
    clients,
    insurers,
    billingTypes: [
      {
        id: 1,
        name: 'claims'
      },
      {
        id: 2,
        name: 'invoices'
      }
    ],
    claimTypes: ['chronic', 'acute']
  });
}

function CustomAutoComplete({ options, formId, fieldLabel }) {
  return (
    <Autocomplete
      id={formId}
      options={options}
      autoHighlight
      getOptionLabel={(option) => {
        return option.name
      }}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          required
          label={fieldLabel}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

function BillingCycle({ mode }) {
  const [value, setValue] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Billing Cycle"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField required {...params} />}
      />
    </LocalizationProvider>
  );
}


const BillingTool = () => {
  const data = useLoaderData();

  const [mode, setMode] = useState('preview');
  const handleModeChange = (ev) => {
    setMode(ev.target.value);
  }

  const [billingType, setBillingType] = useState('');
  const handleBillingTypeChange = (ev) => {
    setBillingType(ev.target.value);
  }

  const [claimType, setClaimType] = useState('');
  const handleClaimTypeChange = (ev) => {
    setClaimType(ev.target.value);
  }

  return (
    <div>
      <Box sx={{ paddingBottom: 3 }}>
        <Typography variant='h6' component='h2'>
          Billing Tool
        </Typography>
        <Typography variant='p' component='p'>
          Manual claims will be run via Airflow service
        </Typography>
      </Box>
      <form style={{ width: 800 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <FormControl required fullWidth>
              <InputLabel>Mode</InputLabel>
              <Select
                labelId="mode-select-label"
                id="mode-select"
                value={mode}
                label="Mode"
                onChange={handleModeChange}
              >
                {data.modes.map(m =>
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                )}
              </Select>
              <FormLabel error color='warning'>Submission Mode may send PHI externally - please run Preview Mode first to confirm parameters!</FormLabel>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomAutoComplete options={data.partnerships} fieldLabel="Choose a partnership" formId="partnership-select" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomAutoComplete options={data.clients} fieldLabel="Choose a client" formId="client-select" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomAutoComplete options={data.insurers} fieldLabel="Choose an insurer" formId="insurer-select" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl required fullWidth>
              <InputLabel>Billing Type</InputLabel>
              <Select
                labelId="billing-select-label"
                id="billing-select"
                value={billingType}
                label="Billing Type"
                onChange={handleBillingTypeChange}
              >
                {data.billingTypes.map(m =>
                  <MenuItem key={m.id} value={m.name}>{m.name}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <BillingCycle mode={mode} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel>Claim Type</InputLabel>
              <Select
                labelId="claim-select-label"
                id="claim-select"
                value={claimType}
                label="Claim Type"
                onChange={handleClaimTypeChange}
              >
                {data.claimTypes.map(m =>
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="outlined-number"
              label="Claims Limit"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          `
          <Grid item xs={12} sm={12} justifyContent='flex-end' alignItems='flex-end'>
            <Button variant="contained">Run</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
};

export default BillingTool;
